import React from 'react';

const OrdersHeader: React.FC = () => {
  return (
    <div className="flex w-full items-stretch gap-5 flex-wrap justify-between max-md:max-w-full mb-6">
      <h1 className="text-[#2E2C34] text-2xl lg:text-[32px] font-semibold leading-none">Orders</h1>
    </div>
  );
};

export default OrdersHeader;
