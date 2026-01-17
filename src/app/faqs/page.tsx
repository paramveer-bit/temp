import React from 'react';
import Navbar from '@/components/navbar/navbar';
import FAQAccordion from '@/components/pages/faqs/FAQAccordion';
import FAQSection from '@/components/pages/faqs/FAQSection';
import { faqsData } from '@/components/pages/faqs/faqsData';
import Footer from '@/components/footer/footer';

export const metadata = {
  title: 'FAQs | MarkMyAd',
  description: 'Frequently asked questions about Substance and our services.',
};

export default function FAQsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-gray-800">
            FAQs
          </h1>

          <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
            <FAQAccordion faqs={faqsData} defaultOpen={0} />
            <FAQSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
