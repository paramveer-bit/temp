import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

const Visualize = () => {
  return (
    <div className="bg-white py-4 sm:pt-[-10] md:pt-190 lg:pt-190 space-y-4 md:space-y-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4">
        Visualize your <span className="text-[#E91724]">Business Growth</span>
      </h2>
      <p className="text-[#696969] text-center text-base sm:text-lg md:text-xl px-4">
        Track progress, uncover opportunities, and see your success in action.
      </p>
      <div className="flex justify-center pt-4 md:pt-6">
        <Button className="bg-linear rounded-full font-bold px-6 py-3 md:px-8 md:py-4 lg:p-6 text-sm md:text-base">
          BEGIN JOURNEY
        </Button>
      </div>
      <div className="relative hidden md:block max-w-240 w-full h-[500px] lg:h-[662px] mx-auto p-2">
        <Image src="/home/map.png" fill alt="Business Growth Map" quality={100} unoptimized />
      </div>
      <div className="relative md:hidden max-w-240 w-full h-[250px] sm:h-[300px] mx-auto p-2">
        <Image
          src="/home/map_mobile.png"
          fill
          alt="Business Growth Map Mobile"
          quality={100}
          unoptimized
        />
      </div>
    </div>
  );
};

export default Visualize;
