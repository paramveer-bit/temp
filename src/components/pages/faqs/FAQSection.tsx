import React from 'react';
import Link from 'next/link';

const FAQSection: React.FC = () => {
  return (
    <div className="text-center mt-12 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Still have a questions?</h3>
      <p className="text-base text-gray-600">
        If you cannot find answer to your question in our FAQ, you can always{' '}
        <Link
          href="/contact"
          className="text-purple-600 hover:text-purple-700 hover:underline font-medium"
        >
          contact us
        </Link>
        . We will answer to you shortly!
      </p>
    </div>
  );
};

export default FAQSection;
