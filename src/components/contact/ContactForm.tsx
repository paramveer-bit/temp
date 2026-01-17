'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type ContactFormData = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  inquiryType: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: { inquiryType: 'general' },
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error('NEXT_PUBLIC_API_URL is not defined');
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || 'Something went wrong');
      }

      setStatus({ type: 'success', text: 'Message sent successfully.' });
      reset();
    } catch (err) {
      setStatus({
        type: 'error',
        text: err instanceof Error ? err.message : 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'mt-1 block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input
        {...register('fullName', { required: 'Full name is required' })}
        placeholder="Full name"
        className={inputClass}
      />
      {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}

      <input
        type="email"
        {...register('email', { required: 'Email is required' })}
        placeholder="Email"
        className={inputClass}
      />
      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

      <input {...register('phone')} placeholder="Phone (optional)" className={inputClass} />
      <input {...register('company')} placeholder="Company" className={inputClass} />

      <select {...register('inquiryType')} className={inputClass}>
        <option value="general">General</option>
        <option value="sales">Sales</option>
        <option value="support">Support</option>
        <option value="partnership">Partnership</option>
        <option value="media">Media</option>
      </select>

      <textarea
        {...register('message', { required: 'Message is required' })}
        rows={5}
        placeholder="Your message"
        className={inputClass}
      />
      {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}

      {status && (
        <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {status.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#160E77] py-3 text-white font-semibold disabled:opacity-60"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
