'use client';

import React from 'react';
import TableOfContents from './TableOfContents';

interface PrivacyContentProps {
  effectiveDate: string;
  tableOfContents: string[];
}

const PrivacyContent: React.FC<PrivacyContentProps> = ({ effectiveDate, tableOfContents }) => {
  return (
    <section className="flex-1">
      {/* ✅ Effective Date */}
      <p className="text-sm text-gray-500 mb-6 font-medium">Effective: {effectiveDate}</p>

      {/* ✅ Description */}
      <div className="space-y-6 mb-8">
        <p className="text-base leading-relaxed text-gray-700">
          This Privacy Policy describes how <strong>Substance</strong> collects, uses, and discloses
          information, and what choices you have with respect to the information.
        </p>
        <p className="text-base leading-relaxed text-gray-700">
          When we refer to &quot;Substance&quot;, we mean the Substance entity that acts as the
          controller or processor of your information, as explained in more detail in the
          &quot;Identifying the Data Controller and Processor&quot; section below.
        </p>
      </div>

      {/* ✅ Table of Contents */}
      <TableOfContents items={tableOfContents} />

      {/* ✅ Main Body */}
      <div className="space-y-6">
        <section id="applicability-of-this-privacy-policy" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Applicability Of This Privacy Policy
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PrivacyContent;
