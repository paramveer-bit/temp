import Image from 'next/image';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpen, Sparkles, IndianRupee } from 'lucide-react';

const accordionItems = [
  {
    id: 'item-1',
    icon: BookOpen,
    title: 'Seller Resources',
    content:
      "At MarkMyAd, we equip our sellers with everything they need to succeed. Whether you're new or experienced, our guides, tools, and tutorials help you optimize listings, manage inventory, and connect with buyers. Our support team is always available for assistance.",
  },
  {
    id: 'item-2',
    icon: Sparkles,
    title: 'Seller Benefits',
    content:
      'Join a community of successful sellers and enjoy a streamlined platform for selling ad inventory across many media types. Discover tools designed to help you grow faster.',
  },
  {
    id: 'item-3',
    icon: IndianRupee,
    title: 'Pricing/Fees',
    content:
      'We believe in transparent and competitive pricing. No hidden fees—list confidently and keep more of your earnings while we provide full platform support.',
  },
];

const World = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg lg:sticky lg:top-32 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
              <div className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px] rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
                <Image
                  src="/home/world.png"
                  fill
                  alt="World of talent on your One-click"
                  className="object-contain p-6 sm:p-7 md:p-8"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-start mt-2 md:mt-3 lg:mt-4">
            <div className="space-y-4 mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 tracking-tight">
                World of talent on your <span className="text-[#E91724] font-bold">One-click</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#E91724] rounded-full" />
            </div>

            <div className="flex-1">
              <Accordion type="single" collapsible className="space-y-3 w-full">
                {accordionItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 hover:border-gray-300 overflow-hidden"
                    >
                      <AccordionTrigger className="px-4 sm:px-5 md:px-6 py-4 sm:py-4 md:py-5 text-left hover:no-underline group">
                        <div className="flex items-center gap-3 sm:gap-4 md:gap-4 w-full">
                          <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#E91724]/10 flex items-center justify-center group-hover:bg-[#E91724]/15 transition-colors duration-200">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#E91724]" />
                          </div>
                          <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 flex-1">
                            {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed">
                        <div className="pl-12 sm:pl-12 md:pl-14">{item.content}</div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default World;
