import Image from 'next/image';
import React from 'react';
import { ShoppingCart, BookOpen, Play, MessageCircle, MapPin } from 'lucide-react';

const Why = () => {
  return (
    <div className="w-full bg-white py-0">
      <div className="max-w-360 mx-auto w-full p-2 flex flex-col-reverse md:flex-row gap-6 lg:gap-10 xl:gap-40">
        <div className="relative w-full h-[300px] sm:h-[420px] md:h-[450px] lg:h-[550px] xl:h-[650px] ml-4 md:ml-8 lg:ml-12">
          <div className="absolute top-0 right-0 w-[140px] sm:w-[180px] md:w-[200px] lg:w-[280px] h-[270px] sm:h-[320px] md:h-[350px] lg:h-[450px]">
            <Image
              src="/home/Mask Group.png"
              fill
              alt="Why MarkMyAd is the Smart Way to Sell"
              quality={100}
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 left-0 w-[140px] sm:w-[180px] md:w-[200px] lg:w-[280px] h-[270px] sm:h-[320px] md:h-[350px] lg:h-[450px]">
            <Image
              src="/home/Mask Group(1).png"
              fill
              alt="Why MarkMyAd is the Smart Way to Sell"
              quality={100}
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-full space-y-8 md:space-y-10 lg:mt-20">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center lg:text-start px-4 md:px-0">
            Why <span className="text-[#E91724]">MarkMyAd</span> is the
            <br className="hidden sm:block" /> Smart Way to Sell?
          </h3>
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex justify-center lg:justify-start gap-8 md:gap-12">
              <ShoppingCart size={40} className="text-[#3B5998]" strokeWidth={1.5} />
              <BookOpen size={40} className="text-[#3B5998]" strokeWidth={1.5} />
              <Play size={40} className="text-[#3B5998]" strokeWidth={1.5} />
              <MessageCircle size={40} className="text-[#3B5998]" strokeWidth={1.5} />
              <MapPin size={40} className="text-[#3B5998]" strokeWidth={1.5} />
            </div>
            <div className="flex justify-center lg:justify-start gap-8 md:gap-12">
              <ShoppingCart size={40} className="text-[#3B5998]" strokeWidth={1.5} />
              <BookOpen size={40} className="text-[#3B5998]" strokeWidth={1.5} />
              <Play size={40} className="text-[#3B5998]" strokeWidth={1.5} />
              <MessageCircle size={40} className="text-[#3B5998]" strokeWidth={1.5} />
              <MapPin size={40} className="text-[#3B5998]" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
