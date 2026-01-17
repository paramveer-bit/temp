'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Minus, Plus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  defaultOpen?: number;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs, defaultOpen = 0 }) => {
  return (
    <Accordion type="single" collapsible defaultValue={`item-${defaultOpen}`} className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b border-gray-200 last:border-b-0"
        >
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline py-4 px-0 [&>svg:first-of-type]:hidden">
            <span className="flex-1 text-left">{faq.question}</span>
            <div className="flex items-center shrink-0 ml-4 relative w-5 h-5">
              <Plus className="plus-icon h-5 w-5 text-gray-600 absolute" />
              <Minus className="minus-icon h-5 w-5 text-purple-600 absolute hidden" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 pb-4 px-0 leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
