'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/provider/AuthContext';
const Navbar = () => {
  const { loading, accessToken } = useAuth();
  return (
    <div className="bg-[#070834] sticky top-0 z-50 backdrop-blur-lg border-b border-white/10">
      <div
        className="flex items-center justify-between max-w-360 mx-auto w-full px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-4 
      transition-all duration-300"
      >
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0 group">
          <Image
            src="/logo/logo-white.png"
            alt="Mark My Ad"
            width={160}
            height={80}
            className="cursor-pointer w-[75px] xs:w-[85px] sm:w-[95px] md:w-[120px] lg:w-[140px] xl:w-[160px] 
            transition-all duration-300 group-hover:scale-105 group-hover:opacity-90"
          />
        </Link>

        {/* DESKTOP SECTION */}
        <div className="hidden md:flex items-center space-x-4 xl:space-x-6">
          {accessToken ? (
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-[#f8794b] to-[#ff8c69] 
              text-white font-semibold lg:text-lg lg:py-3 px-4 xl:px-6 p-2 xl:rounded-lg rounded-md
              transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(248,121,75,0.5)]"
            >
              DASHBOARD
            </Link>
          ) : (
            <>
              {/* LOGIN – COOL GRADIENT BORDER HOVER */}
              <Link
                href="/sign-in"
                className="relative font-medium lg:text-lg px-3 py-1 rounded-md
                 text-[#f8794b] transition-all duration-300
                 hover:text-white
                 before:absolute before:inset-0 before:rounded-md
                 before:p-[2px] before:bg-gradient-to-r before:from-[#f8794b] before:to-[#ff8c69]
                 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300
                 before:-z-10 selection:bg-transparent"
              >
                Log In
              </Link>

              {/* START SELLING BUTTON – MODERN GLOW */}
              <Link
                href="/onboarding"
                className="bg-gradient-to-r from-[#f8794b] to-[#ff8c69] text-white font-semibold 
                lg:text-lg lg:py-3 px-4 xl:px-6 p-2 xl:rounded-lg rounded-md
                transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,140,105,0.55)]"
              >
                START SELLING
              </Link>
            </>
          )}
        </div>

        {/* MOBILE/TABLET SECTION */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          {accessToken ? (
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-[#f8794b] to-[#ff8c69] text-white text-[10px] sm:text-xs 
              font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all duration-300 
              hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(248,121,75,0.4)]"
            >
              DASHBOARD
            </Link>
          ) : (
            <>
              {/* MOBILE LOGIN */}
              <Link
                href="/sign-in"
                className="text-[#f8794b] text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 sm:py-2.5 
                transition-all duration-300 hover:text-[#ff9d7b] active:scale-95"
              >
                Log In
              </Link>

              {/* MOBILE START SELLING */}
              <Link
                href="/onboarding"
                className="text-white text-[10px] sm:text-xs font-semibold uppercase px-3 sm:px-5 
                py-2 sm:py-2.5 rounded-full transition-all duration-300 active:scale-95 
                shadow-[0_0_15px_rgba(248,121,75,0.4)] whitespace-nowrap"
                style={{
                  background: 'linear-gradient(to right, #f8794b, #f85a60, #ff8c69)',
                }}
              >
                START SELLING
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
