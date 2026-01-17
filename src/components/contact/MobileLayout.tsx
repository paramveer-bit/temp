import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import ContactForm from './ContactForm';
import React from 'react';

export default function MobileContactLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="px-6 py-8 flex-grow">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">Contact Us</h1>
          <p className="text-sm text-gray-600">
            We try to respond within 24 hours. Send us a message and we&apos;ll get back to you
            soon.
          </p>
        </div>

        <div className="mt-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
