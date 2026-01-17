'use client';

import React from 'react';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ReceiptIcon from '@mui/icons-material/Receipt';
import UndoIcon from '@mui/icons-material/Undo';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { NumberTicker } from '@/components/magicui/number-ticker';

interface AnalyticsCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: string;
  changeText: string;
  icon: React.ReactNode;
  positive?: boolean;
  gradient?: boolean;
  decimalPlaces?: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  changeText,
  icon,
  positive = true,
  gradient = false,
  decimalPlaces = 0,
}) => {
  const textColor = gradient ? 'text-white' : 'text-black';
  const subTextColor = gradient ? 'text-[#E3E1E5]' : 'text-[#84818A]';
  const iconBgColor = gradient ? 'bg-white/20' : 'bg-[#F3F0FF]';
  const iconColor = gradient ? 'text-white' : 'text-[#7A5AF8]';
  const cardBg = gradient ? 'bg-linear-to-r from-[#EC5E6F] to-[#F29C54]' : 'bg-white shadow-xs';

  return (
    <div className="min-w-[220px] flex-1 rounded-sm overflow-hidden">
      <div className={`flex flex-col px-6 py-6 ${cardBg}`}>
        <div className="flex items-center gap-3 text-sm font-medium">
          <span
            className={`flex items-center justify-center text-white w-6 h-6 rounded-full ${iconBgColor}`}
          >
            <span className={iconColor}>{icon}</span>
          </span>
          <span className={textColor}>{title}</span>
        </div>

        <div className="mt-4 text-[32px] font-semibold flex items-center">
          {prefix && <span className={textColor}>{prefix}</span>}
          <NumberTicker
            value={value}
            decimalPlaces={decimalPlaces}
            className={`tracking-tighter ${textColor}`}
          />
          {suffix && <span className={textColor}>{suffix}</span>}
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm">
          {positive ? (
            <CallMadeIcon className="text-[#2CCF7E]" fontSize="inherit" />
          ) : (
            <CallMadeIcon className="text-[#FF5A3A] rotate-90" fontSize="inherit" />
          )}
          <span className={textColor}>{change}</span>
          <span className={`font-normal ${subTextColor}`}>{changeText}</span>
        </div>
      </div>
    </div>
  );
};

const AnalyticsCards: React.FC = () => {
  const cardsData: AnalyticsCardProps[] = [
    {
      title: 'Total Sales',
      value: 0,
      prefix: '$',
      change: '21.9%',
      changeText: '+$67k today',
      icon: <LocalAtmIcon fontSize="inherit" />,
      positive: true,
      gradient: true,
      decimalPlaces: 2,
    },
    {
      title: 'Visitor',
      value: 0,
      change: '13%',
      changeText: '+7k today',
      icon: <SwitchAccountIcon fontSize="inherit" />,
      positive: true,
    },
    {
      title: 'Total Orders',
      value: 0,
      change: '5.7%',
      changeText: '+5k today',
      icon: <ReceiptIcon fontSize="inherit" />,
      positive: true,
    },
    {
      title: 'Refunded',
      value: 0,
      change: '11%',
      changeText: '+21 today',
      icon: <UndoIcon fontSize="inherit" />,
      positive: false,
    },
  ];

  return (
    <section className="flex flex-wrap gap-4 mt-8">
      {cardsData.map((card, index) => (
        <AnalyticsCard key={index} {...card} />
      ))}
    </section>
  );
};

export default AnalyticsCards;
