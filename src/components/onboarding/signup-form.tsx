'use client';

import type React from 'react';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/hooks/use-query';
export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  // const api = useAxiosAuth();
  // const router = useRouter();
  const { mutate, isPending } = signUp();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.number || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);

    // Simulate form submission
    mutate(formData, {
      onSuccess: () => {
        setIsLoading(false);
        setSuccess(true);
      },
      onError: (err: any) => {
        setIsLoading(false);
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground font-medium">
          Full Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          className="border-2 border-border bg-white text-foreground placeholder:text-foreground/40 focus:border-primary"
        />
      </div>

      {/* Phone Number Field */}
      <div className="space-y-2">
        <Label htmlFor="number" className="text-foreground font-medium">
          Phone Number
        </Label>
        <Input
          id="number"
          name="number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.number}
          onChange={handleChange}
          className="border-2 border-border bg-white text-foreground placeholder:text-foreground/40 focus:border-primary"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="border-2 border-border bg-white text-foreground placeholder:text-foreground/40 focus:border-primary"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground font-medium">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className="border-2 border-border bg-white text-foreground placeholder:text-foreground/40 focus:border-primary"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm font-medium">Account created successfully! 🎉</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base rounded-full transition-all shadow-lg"
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </Button>

      {/* Login Link */}
      <p className="text-center text-foreground/60 text-sm">
        Already have an account?{' '}
        <a href="/sign-in" className="text-primary hover:underline font-medium">
          Log in
        </a>
      </p>
    </form>
  );
}
