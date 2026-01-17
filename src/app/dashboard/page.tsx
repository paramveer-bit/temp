'use client';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AnalyticsCards from '@/components/dashboard/AnalyticsCards';
import { useAuth } from '@/provider/AuthContext';
const DashboardPage = () => {
  const { user: seller, loading } = useAuth();
  console.log('Seller Data:', seller);
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mt-8">Welcome back, {seller?.name?.split(' ')[0]}</h1>
          <p className="text-lg mt-2">Here&apos;s what&apos;s happening with your store today.</p>
        </div>

        <div className="shadow-[0_1px_3px_0_rgba(0,0,0,0.12)] text-sm text-[#84818a] font-medium rounded overflow-hidden">
          <div className="flex items-center justify-between bg-white px-4 py-3 gap-2 rounded">
            <div>
              Show stats: <span className="text-black">Yearly</span>
            </div>
            <ArrowDropDownIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      <AnalyticsCards />
    </>
  );
};

export default DashboardPage;
