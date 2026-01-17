import React from 'react';
import Image from 'next/image';
import { IOrder } from '@/types/types';

interface OrderPaymentCellProps {
  order?: IOrder;
}

const OrderPaymentCell: React.FC<OrderPaymentCellProps> = ({ order }) => {
  const paymentMethod = (order as any)?.paymentMethod;
  const lastFour = paymentMethod?.lastFourDigits || '819';

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo/mastercard.png"
        alt="Payment"
        width={24}
        height={24}
        className="object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="text-sm text-gray-600">**** {lastFour}</span>
    </div>
  );
};

export default OrderPaymentCell;
