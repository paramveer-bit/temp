import MapSection from './MapSection';
import React from 'react';

export default function ContactInfo() {
  return (
    <section className="max-w-xl">
      <h1 className="text-4xl font-extrabold text-gray-900">Contact us</h1>

      <p className="mt-4 text-gray-600 leading-relaxed max-w-md">
        We are always looking for ways to improve our products and services. Reach out for sales,
        support or partnership inquiries. We&apos;ll respond as quickly as possible.
      </p>

      <div className="mt-6 inline-flex items-center gap-4 text-gray-700 text-sm">
        <a href="mailto:Akshay@markmyad.com" className="hover:text-blue-600 transition-colors">
          Akshay@markmyad.com
        </a>
        <span className="text-gray-300">•</span>
        <a href="tel:+917700000766" className="hover:text-blue-600 transition-colors">
          +91 (770) 000 0766
        </a>
      </div>

      <div className="mt-8">
        <MapSection />
      </div>
    </section>
  );
}
