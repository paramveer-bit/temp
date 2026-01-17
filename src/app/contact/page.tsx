import React from 'react';
import DesktopContactLayout from '@/components/contact/DesktopLayout';
import MobileContactLayout from '@/components/contact/MobileLayout';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="md:hidden">
        <MobileContactLayout />
      </div>
      <div className="hidden md:block">
        <DesktopContactLayout />
      </div>
    </div>
  );
}
