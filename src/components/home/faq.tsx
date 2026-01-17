'use client';
import React from 'react';
import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const Faq = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = useCallback((index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const faqItems = useMemo(
    () =>
      faqs.map(({ question, answer }, index) => {
        const isOpen = openItems.has(index);
        return (
          <Collapsible
            key={`faq-${index}`}
            open={isOpen}
            onOpenChange={() => toggleItem(index)}
            className="group"
          >
            <div className="bg-white border border-[#E5E7EB] rounded-lg hover:border-[#E91724]/30 transition-all duration-200 hover:shadow-md overflow-hidden">
              <CollapsibleTrigger className="w-full text-left p-4 sm:p-5 md:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91724]/20 focus-visible:ring-offset-2 rounded-lg">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 pr-2 flex-1 leading-snug">
                    {question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#E91724] text-white'
                        : 'bg-[#F5F5FF] text-[#E91724] group-hover:bg-[#E91724]/10'
                    }`}
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                  <div className="pt-2 border-t border-[#E5E7EB]">
                    <p className="text-xs sm:text-sm md:text-base text-[#696969] leading-relaxed pt-3 sm:pt-4">
                      {answer}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        );
      }),
    [openItems, toggleItem],
  );

  return (
    <section className="w-full bg-white pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 pb-4 sm:pb-5 md:pb-6 lg:pb-8 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="text-center mb-6 sm:mb-7 md:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-gray-900 leading-tight">
            Frequently Asked <span className="text-[#E91724]">Questions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#696969] max-w-2xl mx-auto leading-relaxed px-4">
            Find answers to common questions about selling your ad inventory on MarkMyAd
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {faqItems}
        </div>

        <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10 text-center">
          <p className="text-sm sm:text-base md:text-lg text-[#696969] mb-3 sm:mb-4">
            Still have questions?
          </p>
          <Link
            href="/contact"
            className="inline-block text-[#E91724] font-semibold text-sm sm:text-base md:text-lg hover:underline transition-colors duration-200"
          >
            Contact our support team →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Faq;

const faqs = [
  {
    question: 'How do I list my ad inventory on MarkMyAd?',
    answer:
      "After signing up and creating an account, you can list your ad inventory by navigating to the 'Start Selling' section. Upload all details such as media type, pricing, and availability.",
  },
  {
    question: 'What types of ad inventories can I sell on MarkMyAd?',
    answer:
      'You can sell inventories across Newspapers, Magazines, TV, Radio, Influencer Marketing, Digital & Social Media, and Out-of-Home (OOH) advertising such as billboards and transit ads.',
  },
  {
    question: 'Is there a fee for listing my ad inventory?',
    answer:
      'Listing is free. A commission or service fee applies only when your ad space is booked by a buyer.',
  },
  {
    question: 'How do I manage multiple ad inventories?',
    answer:
      'You can manage all inventories through a single dashboard. Track ad spaces, monitor bookings, and update prices or availability in real time.',
  },
  {
    question: 'How do payments work?',
    answer:
      'Payments are securely processed through the platform. Payouts are sent directly to your linked bank account within the payment cycle.',
  },
  {
    question: 'Can I set custom pricing for my ad inventory?',
    answer:
      'Yes, you have full control over pricing. Adjust rates based on media platform, time slots, location, and other factors.',
  },
  {
    question: 'How do I know if my inventory is performing well?',
    answer:
      'You get a performance dashboard showing impressions, clicks, bookings, and revenue. Helpful insights guide you to improve visibility and conversions.',
  },
  {
    question: 'What kind of support does MarkMyAd offer sellers?',
    answer:
      'We provide 24/7 support via chat, email, and phone. Our team helps with setup, listings, bookings, and performance analytics.',
  },
  {
    question: 'How do I handle buyer inquiries or special requests?',
    answer:
      'Buyers contact you through the platform. You will be notified instantly and can respond to finalize terms or requirements.',
  },
  {
    question: 'How does MarkMyAd ensure fair bookings and visibility?',
    answer:
      'The system provides equal visibility to all sellers based on media type, location, and buyer preferences—ensuring fair exposure.',
  },
  {
    question: 'What is the best site to sell products?',
    answer:
      'MarkMyAd is best for selling ad inventories. For physical products, Amazon, Flipkart, and Shopify are popular choices.',
  },
  {
    question: 'Can I sell my own products online?',
    answer:
      'Yes. You can create a store on Shopify, Amazon, or Flipkart. For ad inventory selling, MarkMyAd connects sellers with relevant buyers.',
  },
  {
    question: 'How to sell products online for beginners?',
    answer:
      'Choose a platform (Shopify/Amazon), add product details, pricing, and promote through social media. MarkMyAd is ideal for ad inventory beginners.',
  },
  {
    question: 'How do I sell an item online?',
    answer:
      'Create an account, list your item with details, set a competitive price, and respond to inquiries. Payments and bookings are handled inside the platform.',
  },
];
