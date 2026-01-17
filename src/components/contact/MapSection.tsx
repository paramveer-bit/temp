import Image from 'next/image';
import React from 'react';

export default function MapSection() {
  return (
    <div className="relative w-full max-w-2xl mx-auto mt-10">
      <Image
        src="/contact/world-map.png"
        alt="World Map"
        width={1200}
        height={800}
        className="w-full max-h-[610px] h-auto rounded-xl object-contain"
      />

      <div className="absolute left-[65%] top-[26%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <span className="bg-white text-gray-800 px-3 py-1 text-sm rounded-lg border border-gray-300 shadow mb-1">
          We are here
        </span>

        <div className="w-[1.5px] h-32 bg-[#070834] opacity-35 rounded-full" />

        <div className="relative flex items-center justify-center mt-1">
          <span className="absolute inline-flex h-5 w-5 rounded-full bg-[#070834] opacity-30 animate-ping" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-[#070834]" />
        </div>
      </div>
    </div>
  );
}
