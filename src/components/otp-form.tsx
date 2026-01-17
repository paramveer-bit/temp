'use client';
import { useState, useEffect } from 'react';
import type React from 'react';
import { useRouter } from 'next/navigation';
import { verify, useResendCode } from '@/hooks/use-query';
export default function OTPForm({ id }: { id: string }) {
  const router = useRouter();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);
  const { mutate, isPending } = verify(); // Use the hook
  const { mutate: resendCode, isPending: isResendPending } = useResendCode();
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    mutate({ id: id, otp });
    console.log('OTP submitted:', otp);
    // Handle OTP verification logic here
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    resendCode(id);
    setCanResend(false);
    setResendTimer(30);
    console.log('OTP resent');
    // Handle resend OTP logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* OTP Input */}
      <div className="space-y-2">
        <label htmlFor="otp" className="text-sm font-medium text-foreground">
          Enter OTP Code
        </label>
        <input
          id="otp"
          type="text"
          placeholder="000000"
          value={otp}
          onChange={handleOTPChange}
          maxLength={6}
          className="w-full px-4 py-3 rounded-lg border-2 border-border text-center text-2xl tracking-widest font-semibold text-foreground placeholder-foreground/40 focus:outline-none focus:border-[#FF7B42] transition"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {/* Resend OTP */}
      <div className="text-center">
        <p className="text-sm text-foreground/60">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend}
            className={`font-medium transition ${
              canResend
                ? 'text-[#FF7B42] hover:text-[#FF7B42]/80 cursor-pointer hover:underline'
                : 'text-foreground/40 cursor-not-allowed'
            }`}
          >
            {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
          </button>
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full hover:bg-[#FF7B42]/90 text-accent-foreground bg-[#FF7B42] font-bold text-white py-3 px-4 rounded-full transition duration-200 transform hover:scale-105"
      >
        VERIFY OTP
      </button>
    </form>
  );
}
