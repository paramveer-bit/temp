import Stepper from './stepper';
import React from 'react';

const JoinUs = () => {
  return (
    <section className="w-full bg-[#160E77] text-white py-10 sm:py-12 md:py-16 lg:py-20 mt-8 lg:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 xl:gap-16 items-start">
          <div className="w-full lg:w-2/5 space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
              Join Us in a Few Simple Steps
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
              Join us quickly with our simple, step-by-step guide. Just a few easy actions and
              you&apos;ll be ready to start connecting with top advertisers and growing your
              revenue.
            </p>
          </div>
          <div className="w-full lg:w-3/5 bg-gradient-to-br from-[#3744AA] via-[#4956BD] to-[#3744AA] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 overflow-hidden shadow-2xl border border-white/15 backdrop-blur-sm">
            <Stepper />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
