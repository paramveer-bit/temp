'use client';
import React from 'react';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const Subscribe = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    // console.log('Subscribing:', email);
    setEmail('');
  };

  return (
    <section className="w-full bg-white pt-2 sm:pt-3 md:pt-4 lg:pt-5 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-200 shadow-sm">
          {/* Header Section */}
          <div className="text-center mb-3 sm:mb-4 md:mb-5">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2 leading-tight px-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-[#696969] max-w-lg sm:max-w-xl mx-auto leading-relaxed px-2">
              Get the latest updates, tips, and insights about selling your ad inventory.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="max-w-md sm:max-w-lg md:max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-9 sm:h-10 md:h-11 bg-white text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus-visible:ring-2 focus-visible:ring-[#E91724]/20 focus-visible:border-[#E91724] transition-all duration-300 px-3 sm:px-4"
              />
              <Button
                type="submit"
                className="group h-9 sm:h-10 md:h-11 bg-linear text-white font-semibold rounded-lg sm:rounded-r-lg sm:rounded-l-none px-4 sm:px-5 md:px-6 text-xs sm:text-sm md:text-base hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
