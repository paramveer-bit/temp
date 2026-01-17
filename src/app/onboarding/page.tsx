'use client';
import SignupForm from '@/components/onboarding/signup-form';
import image from '@/../public/onboarding/step1.png';
import logo from '@/../public/logo/logo-white.png';
import Image from 'next/image';
export default function Page() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-primary to-blue-900 flex-col p-8 relative overflow-hidden">
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 lg:top-6 lg:left-6 xl:top-8 xl:left-8 z-20 transition-transform duration-300 hover:scale-105">
          <div className="relative w-24 h-6 sm:w-28 sm:h-7 md:w-32 md:h-8 lg:w-36 lg:h-10 xl:w-44 xl:h-12 drop-shadow-lg">
            <Image
              src={logo.src}
              alt="Mark My Ad"
              fill
              sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, 176px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Decorative dots pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full" />
            ))}
          </div>
        </div>

        {/* Circular Image Container - centered vertically */}
        <div className="flex-1 flex items-center justify-center relative z-10 ">
          <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
            <img
              src={image.src}
              alt="Email notification illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center text-white relative z-10 max-w-sm mx-auto px]">
          <p className="text-lg font-light leading-relaxed">
            Easily Manage and Create your data or other words
          </p>
        </div>

        {/* Decorative shapes */}
        <div className="absolute bottom-8 right-12 w-16 h-16 bg-accent rounded-lg transform rotate-45 opacity-20" />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-secondary flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Back Button and Progress */}
          <div className="mb-8 flex items-center justify-between">
            <button className="text-foreground hover:opacity-70 transition flex items-center gap-2 font-medium">
              <span>←</span> BACK
            </button>
            <div className="flex gap-1">
              <div className="w-24 h-1 bg-border rounded-full" />
              <div className="w-8 h-1 bg-accent rounded-full" />
            </div>
          </div>

          {/* Form Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground leading-tight">
              Create your account
            </h2>
            <p className="text-foreground/60 mt-2">Sign up to get started with us</p>
          </div>

          {/* Form */}
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
