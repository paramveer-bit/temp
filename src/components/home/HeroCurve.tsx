import React from 'react';

const HeroCurve = () => {
  return (
    <svg
      className="block w-full -mt-[3px] -mb-[3px]"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroCurveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#160E77" />
          <stop offset="100%" stopColor="#3C4CA3" />
        </linearGradient>
      </defs>

      {/* White base so the curve transition looks clean */}
      <rect width="1440" height="180" fill="#ffffff" />

      {/* Blue curved top */}
      <path
        fill="url(#heroCurveGradient)"
        d="
          M0,80
          C220,40 520,20 760,60
          C1040,110 1240,200 1440,170
          L1440,0
          L0,0
          Z
        "
      />
    </svg>
  );
};

export default HeroCurve;
