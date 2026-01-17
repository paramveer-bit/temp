'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Zap, Target, BarChart3, Users, TrendingUp, Shield, ArrowRight } from 'lucide-react';

const Article = () => {
  const features = [
    {
      icon: Zap,
      title: 'Simplify Your Listing Process, Maximize Your Reach',
      description: [
        "You don't have time for complex systems—and with MarkMyAd, you won't need to. List your TV slots, radio segments, or digital influencer spaces in minutes.",
        'MarkMyAd connects you with brands and agencies across India, showcasing your inventory to thousands of active buyers.',
      ],
    },
    {
      icon: Target,
      title: 'Optimize Your Listings for Maximum Impact',
      description: [
        'Making your inventory stand out is essential. MarkMyAd lets you fully customize listings and boost visibility with SEO-ready pages.',
        'High-quality images and transparent pricing help you gain trust and conversions.',
      ],
    },
    {
      icon: BarChart3,
      title: 'Manage with Confidence and Insights',
      description: [
        'The key to successful sales is insight—MarkMyAd provides real-time analytics, helping you track performance and revenue effortlessly.',
      ],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Effortless scaling',
      description: 'Works for small or large ad networks.',
    },
    {
      icon: Users,
      title: 'Reach your target market',
      description: 'Connect with high-intent buyers.',
    },
    {
      icon: Shield,
      title: 'Expert support',
      description: 'Get dedicated seller assistance anytime.',
    },
  ];

  return (
    <section className="w-full bg-white pt-2 sm:pt-3 md:pt-4 lg:pt-5 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header Section */}
        <header className="text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8">
          <div className="inline-block mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-semibold text-[#E91724] uppercase tracking-wider bg-[#E91724]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              Why Choose MarkMyAd
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 leading-tight px-2">
            Unlock New Opportunities for Your <span className="text-[#E91724]">Ad Inventory</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#696969] max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            In today&apos;s fast-evolving advertising landscape, the power of visibility can&apos;t
            be overstated. Whether {"you're"} managing high-value out-of-home (OOH) billboards,
            premium TV ad slots, or working with top-tier influencers, your ability to connect with
            potential customers looking for ad space is the cornerstone of your business.
          </p>
        </header>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-1 sm:mb-2 md:mb-3 lg:mb-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <article
                key={index}
                className="group bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 border border-gray-200 hover:border-[#E91724]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#E91724]/5 hover:-translate-y-1"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg bg-[#E91724]/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-[#E91724]/15 transition-colors duration-200">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#E91724]" />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  {feature.title}
                </h2>
                <div className="space-y-2.5 sm:space-y-3">
                  {feature.description.map((desc, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base md:text-lg text-[#696969] leading-relaxed"
                    >
                      {desc}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl pt-2 sm:pt-3 md:pt-4 lg:pt-5 pb-4 sm:pb-6 md:pb-8 lg:pb-10 px-4 sm:px-6 md:px-8 lg:px-10 mb-0 sm:mb-1 md:mb-2 lg:mb-3">
          <div className="text-center mb-5 sm:mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 leading-tight">
              Why Partner with <span className="text-[#E91724]">MarkMyAd?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#696969] max-w-2xl mx-auto px-2">
              Everything you need to grow your ad inventory business
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 border border-gray-200 hover:border-[#E91724]/30 transition-all duration-300 hover:shadow-md group"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg bg-[#E91724]/10 flex items-center justify-center group-hover:bg-[#E91724]/15 transition-colors duration-200">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#E91724]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 leading-tight">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-base text-[#696969] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight px-2">
            Ready to Get Started?
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-[#696969] mb-2 sm:mb-3 md:mb-4 max-w-xl mx-auto leading-relaxed px-2">
            MarkMyAd simplifies selling so you can focus on providing value and growing your
            business with confidence. Everything you need—organized and seamless.
          </p>
          <Link href="/onboarding">
            <Button className="group px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 bg-linear text-white font-semibold rounded-lg text-xs sm:text-sm md:text-base hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <span className="hidden sm:inline">Start listing your ad inventory today</span>
                <span className="sm:hidden">Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Article;
