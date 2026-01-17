'use client';
import { useState } from 'react';
import { useSignIn } from '@/hooks/use-query';
import axios from 'axios';
export default function SigninForm() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [emailOrPhoneError, setEmailOrPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, isPending } = useSignIn();
  const validateEmailOrPhone = (value: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-+$$$$]{10,}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setEmailOrPhoneError('');
    setPasswordError('');

    let isValid = true;

    if (!emailOrPhone.trim()) {
      setEmailOrPhoneError('Email or phone number is required');
      isValid = false;
      return;
    } else if (!validateEmailOrPhone(emailOrPhone)) {
      setEmailOrPhoneError('Please enter a valid email or phone number');
      isValid = false;
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
      return;
    }

    if (!isValid) return;

    setIsLoading(true);
    // Simulate API call
    mutate(
      { emailOrPhone, password },
      {
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };
  // const handel = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.get('http://localhost:4000/api/v1/seller/auth/refresh-access-token', {
  //       withCredentials: true,
  //     });
  //     console.log(res);
  //   } catch (error) {}
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email or Phone Field */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Email or Phone Number
        </label>
        <input
          type="text"
          value={emailOrPhone}
          onChange={(e) => {
            setEmailOrPhone(e.target.value);
            if (emailOrPhoneError) setEmailOrPhoneError('');
          }}
          placeholder="example@gmail.com or +1234567890"
          className={`w-full px-4 py-3 border-2 rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition ${
            emailOrPhoneError ? 'border-destructive' : 'border-border'
          }`}
        />
        {emailOrPhoneError && <p className="text-destructive text-sm mt-1">{emailOrPhoneError}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError('');
          }}
          placeholder="Enter your password"
          className={`w-full px-4 py-3 border-2 rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition ${
            passwordError ? 'border-destructive' : 'border-border'
          }`}
        />
        {passwordError && <p className="text-destructive text-sm mt-1">{passwordError}</p>}
      </div>

      {/* Forgot Password Link */}
      <div className="text-right">
        <a href="#" className="text-[#FF7B42] hover:opacity-80 transition text-sm font-medium">
          {/* <button onClick={handel}> */}
          Forgot password?
          {/* </button> */}
        </a>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#FF7B42] hover:bg-[#FF7B42]/90 disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground font-semibold py-3 px-4 rounded-full transition duration-200 transform hover:scale-105"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-foreground/60">
          Don't have an account?{' '}
          <a href="/onboarding" className="text-[#FF7B42] hover:opacity-80 transition font-medium">
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
}
