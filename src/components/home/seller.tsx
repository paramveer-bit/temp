import Image from 'next/image';
import React from 'react';

const Seller = () => {
  return (
    <div className="w-full bg-white py-6 md:py-10">
      <div className="max-w-360 mx-auto w-full flex flex-col sm:flex-row items-center justify-start gap-10 mt-10 lg:mt-0 p-2">
        <div className="flex items-center gap-3">
          <div className="relative w-[110px] h-[45px] sm:w-[130px] sm:h-[55px]">
            <Image
              src="/home/individual_seller.png"
              fill
              alt="Individual Seller"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col leading-none">
            <p className="text-[#1E1E1E] font-extrabold text-base sm:text-lg">18K+</p>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">Individual Seller</p>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-[#1E1E1E] font-extrabold text-lg sm:text-xl">5 Star Ratings</p>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-[#FFC107] text-base sm:text-lg">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>

            <p className="text-[#1E1E1E] font-medium text-sm sm:text-base">
              4.58 <span className="font-medium">(300K+)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
