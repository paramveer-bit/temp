import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function DesktopContactLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="relative grid grid-cols-2 gap-12 px-10 py-16 lg:px-24 lg:py-24 flex-grow">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: 'radial-gradient(#F3F4F6 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.6,
          }}
        />

        <div className="relative z-10 flex flex-col justify-center gap-8">
          <ContactInfo />
        </div>

        <div className="relative z-10 flex items-center">
          <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
