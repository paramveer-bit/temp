'use client';
import React from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { defineStepper } from '@stepperize/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputOTP, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp';
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';

const phoneSchema = z.object({
  mobile_number: z.coerce.number().min(10, 'invalid mobile number'),
});

const otpSchema = z.object({
  otp: z.string().min(4, {
    message: 'Your one-time password must be 4 characters.',
  }),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

const { useStepper, steps } = defineStepper(
  { id: 'phone', label: 'Phone', schema: phoneSchema },
  { id: 'otp', label: 'Verify', schema: otpSchema },
  { id: 'complete', label: 'Complete', schema: z.object({}) },
);

const Stepper = () => {
  const stepper = useStepper();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(stepper.current.schema),
  });

  const onSubmit = () => {
    if (stepper.isLast) {
      stepper.reset();
    } else {
      stepper.next();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
        <div className="flex justify-end mb-4">
          <span className="text-xs sm:text-sm text-white font-medium">
            Step {stepper.current.index + 1} of {steps.length}
          </span>
        </div>

        <nav className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center justify-between relative px-2 sm:px-4">
            <div className="absolute top-5 sm:top-6 md:top-7 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 h-0.5 sm:h-1 bg-white/15 rounded-full">
              <div
                className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(stepper.current.index / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            <ol className="relative flex items-center justify-between w-full z-10">
              {stepper.all.map((step, index) => {
                const isCompleted = index < stepper.current.index;

                return (
                  <li key={step.id} className="flex flex-col items-center gap-2 sm:gap-2.5 flex-1">
                    <button
                      type="button"
                      onClick={() => stepper.goTo(step.id)}
                      className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 ease-out bg-white/80 text-[#3744AA] shadow-sm shadow-white/10"
                    >
                      {isCompleted ? (
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-[#3744AA]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </button>
                    <span className="text-xs sm:text-sm font-medium text-white">{step.label}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>

        <div className="space-y-5 sm:space-y-6">
          {stepper.switch({
            phone: () => <PhoneComponent />,
            otp: () => <OtpComponent />,
            complete: () => <CompleteComponent />,
          })}

          {!stepper.isLast ? (
            <div
              className={`flex flex-col sm:flex-row gap-3 pt-4 sm:pt-5 ${stepper.current.index === 0 ? 'justify-start' : 'justify-center'}`}
            >
              <Button
                type="button"
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white/10 text-white/90 border border-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#f8794b] hover:text-white hover:border-[#f8794b]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 text-sm font-medium rounded-lg bg-white/10 text-white/90 border border-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#f8794b] hover:text-white hover:border-[#f8794b]"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center pt-4 sm:pt-5">
              <Button
                type="button"
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#f8794b] to-[#f84c6c] text-white shadow-md shadow-[#f8794b]/30 hover:shadow-lg hover:shadow-[#f8794b]/40 hover:from-[#f88a5c] hover:to-[#f85d6d] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                onClick={stepper.reset}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default Stepper;

function PhoneComponent() {
  const form = useFormContext<PhoneFormValues>();

  return (
    <FormField
      control={form.control}
      name="mobile_number"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-sm sm:text-base font-medium text-white/95">
            Enter your phone number
          </FormLabel>
          <FormControl>
            <Input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              className="w-full bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-white/50 focus-visible:shadow-lg focus-visible:shadow-white/20 py-4 sm:py-5 px-4 sm:px-5 text-base sm:text-lg rounded-lg transition-all duration-300 ease-out hover:border-white/50 hover:bg-white/12 hover:shadow-lg hover:shadow-white/5"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-white/90 text-sm" />
        </FormItem>
      )}
    />
  );
}

function OtpComponent() {
  const form = useFormContext<OtpFormValues>();
  const otpSlotClass =
    'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg border-2 border-white/25 bg-white/10 text-white text-lg sm:text-xl md:text-2xl font-semibold focus:border-[#FFE500] focus:ring-2 focus:ring-[#FFE500]/30 focus:bg-white/15 transition-all duration-200 hover:border-white/35 hover:bg-white/12';

  return (
    <FormField
      control={form.control}
      name="otp"
      render={({ field }) => (
        <FormItem className="space-y-4 sm:space-y-5 w-full">
          <FormLabel className="text-sm sm:text-base font-medium text-white/95 text-center block">
            Enter the OTP sent to your phone number
          </FormLabel>
          <FormControl>
            <div className="flex justify-center px-2 sm:px-4">
              <InputOTP maxLength={4} {...field} className="flex justify-center gap-2 sm:gap-3">
                <InputOTPSlot index={0} className={otpSlotClass} />
                <InputOTPSeparator className="hidden sm:block text-white/40 text-lg font-semibold mx-1" />
                <InputOTPSlot index={1} className={otpSlotClass} />
                <InputOTPSeparator className="hidden sm:block text-white/40 text-lg font-semibold mx-1" />
                <InputOTPSlot index={2} className={otpSlotClass} />
                <InputOTPSeparator className="hidden sm:block text-white/40 text-lg font-semibold mx-1" />
                <InputOTPSlot index={3} className={otpSlotClass} />
              </InputOTP>
            </div>
          </FormControl>
          <FormMessage className="text-white/90 text-center text-sm" />
        </FormItem>
      )}
    />
  );
}

function CompleteComponent() {
  return (
    <div className="text-center py-2 sm:py-3">
      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FFE500]/30 to-[#FFE500]/20 mb-3 sm:mb-4 shadow-md shadow-[#FFE500]/25">
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFE500]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5">Thank you!</h3>
      <p className="text-sm sm:text-base text-white/85">Your account is registered.</p>
    </div>
  );
}
