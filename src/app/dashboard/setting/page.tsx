import React from 'react';
import SettingForm from '@/components/dashboard/setting/setting-form';
import { getSeller } from '@/hooks/use-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SettingPage = async () => {
  const seller = await getSeller();

  if (!seller) {
    return (
      <div className="lg:container mx-auto space-y-10">
        <p>Unable to load seller data</p>
      </div>
    );
  }

  return (
    <div className="lg:container mx-auto space-y-10">
      <SettingForm seller={seller} />
    </div>
  );
};

export default SettingPage;
