'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import autoplay from 'embla-carousel-autoplay';

const Hero = () => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [selected, setSelected] = React.useState(0);
  const autoplayPlugin = React.useRef(autoplay({ delay: 5000 }));

  React.useEffect(() => {
    if (!api) return;
    api.on('select', () => setSelected(api.selectedScrollSnap()));
  }, [api]);

  const handleCategoryClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div
        className="w-full"
        style={{
          background: 'linear-gradient(90deg, #160E77 0%, #3C4CA3 100%)',
        }}
      >
        <h3 className="text-xl lg:text-3xl text-center text-[#A9D7F0] font-medium lg:hidden py-6 px-4">
          <span className="leading-tight">
            Sell with the fastest-growing and preferred acquisition channel
          </span>
        </h3>

        <div className="max-w-360 mx-auto w-full flex flex-col lg:flex-row gap-4 lg:gap-10 xl:gap-20 lg:py-4 xl:py-20 p-2">
          {/* LEFT SECTION */}
          <div className="w-full space-y-14">
            <h3 className="text-2xl lg:text-4xl xl:text-5xl text-[#A9D7F0] font-medium hidden lg:block">
              <span className="leading-tight">
                Sell with the fastest-growing and preferred acquisition channel
              </span>
            </h3>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start">
              <Link href="/onboarding">
                <Button className="bg-linear rounded-full px-7 py-2.5 text-sm sm:text-base lg:text-lg transition hover:scale-105">
                  SIGN UP
                </Button>
              </Link>
              <p className="text-white text-sm sm:text-base lg:text-lg">
                Now sell with lower selling fee*
              </p>
            </div>

            {/* CATEGORY ICONS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-7 md:gap-8 pt-2">
              {categories.map((item, index) => {
                const isActive = selected === index;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleCategoryClick(index)}
                    className="flex flex-col items-center gap-2 transition-transform hover:scale-105 focus:outline-none"
                  >
                    <div className="relative w-[48px] h-[42px] sm:w-[56px] sm:h-[50px] md:w-[60px] md:h-[54px]">
                      <Image
                        src={isActive ? item.highlight : item.img}
                        fill
                        alt={item.name}
                        className={`object-contain transition-transform ${
                          isActive ? 'scale-110' : 'scale-100'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isActive ? 'text-[#f8794b]' : 'text-[#B6BCEB]'
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <Carousel
            setApi={setApi}
            plugins={[autoplayPlugin.current]}
            className="w-full max-w-xl mx-auto"
          >
            <CarouselContent>
              {categories.map((item) => (
                <CarouselItem key={item.name}>
                  <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="relative mx-auto w-full h-[180px] sm:h-[240px] md:h-[300px] xl:h-[330px]">
                      <Image
                        src={item.slider}
                        fill
                        alt={item.name}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
              <div className="flex items-center justify-center gap-3 md:gap-4 -mt-20 md:mt-0">
                {categories.map((_: (typeof categories)[number], i: number) => (
                  <div
                    key={i}
                    className={`p-1 rounded-full transition-all ${
                      selected === i ? 'bg-[#B9BDEC] scale-150' : 'bg-[#646AB0]'
                    }`}
                  />
                ))}
              </div>
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* BOTTOM SHAPE */}

      {/* BOTTOM SHAPE - moved INSIDE bg-hero + overlap fix */}
      <svg
        className="block w-full -mt-px"
        width="100%"
        height="220"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#160E77" />
            <stop offset="100%" stopColor="#3C4CA3" />
          </linearGradient>
        </defs>

        <path
          d="
      M0 0
      H1440
      V150
      C1150 255 780 235 380 165
      C160 130 60 145 0 165
      Z
    "
          fill="url(#waveGrad)"
        />
      </svg>
    </div>
  );
};

export default Hero;

/* DATA */
const categories = [
  {
    name: 'OOH',
    img: '/category/ooh.png',
    slider: '/category/ooh_s.png',
    highlight: '/category/highlight0.png',
    heading: 'Empty billboards don’t sell—list your OOH inventory and watch brands compete!',
    subHeading: 'Empty billboards? Fill them profitably!',
  },
  {
    name: 'Digital',
    img: '/category/digital.png',
    slider: '/category/digitial_s.png',
    highlight: '/category/highlight1.png',
    heading: 'Clicks, impressions, conversions—monetise your digital ad space with ease!',
    subHeading: 'Turn clicks into steady cash!',
  },
  {
    name: 'Print',
    img: '/category/magazine.png',
    slider: '/category/magazine_s.png',
    highlight: '/category/highlight2.png',
    heading: 'Newspapers & magazines drive impact—get top brands to buy your ad slots today!',
    subHeading: 'Newspaper ads, sold in seconds!',
  },
  {
    name: 'Outdoor',
    img: '/category/outdoor.png',
    slider: '/category/outdoor_s.png',
    highlight: '/category/highlight3.png',
    heading: 'From transit to hoardings, every space has value—sell your outdoor ads now!',
    subHeading: 'Every space sells, list now!',
  },
  {
    name: 'TV',
    img: '/category/tv.png',
    slider: '/category/tv_s.png',
    highlight: '/category/highlight4.png',
    heading: 'Turn prime-time into profit—sell your TV ad slots seamlessly on Mark My Ad!',
    subHeading: 'Monetize prime-time, maximize revenue!',
  },
  {
    name: 'Radio',
    img: '/category/radio.png',
    slider: '/category/radio_s.png',
    highlight: '/category/highlight5.png',
    heading: 'Every second on-air is a chance to earn—list your radio spots on Mark My Ad today!',
    subHeading: 'Sell every second, amplify earnings!',
  },
];
