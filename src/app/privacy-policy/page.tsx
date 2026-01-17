import React from 'react';
import Navbar from '@/components/navbar/navbar';
import PrivacySidebar from '@/components/pages/privacy-policy/PrivacySidebar';
import PrivacyContent from '@/components/pages/privacy-policy/PrivacyContent';
import Footer from '@/components/footer/footer';
import {
  sidebarSections,
  tableOfContentsItems,
  effectiveDate,
} from '@/components/pages/privacy-policy/privacyData';

export const metadata = {
  title: 'Privacy Policy | MarkMyAd',
  description:
    'Privacy Policy for Substance - Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Page Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">
          {/* ✅ Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-gray-800">
            Privacy Policy
          </h1>

          {/* ✅ Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <PrivacySidebar sections={sidebarSections} />

            {/* Main Content */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm flex-1">
              <PrivacyContent
                effectiveDate={effectiveDate}
                tableOfContents={tableOfContentsItems}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
