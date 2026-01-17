import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCustomerName, getCustomerAvatar } from '@/utils/orderHelpers';
import { IOrder } from '@/types/types';

interface OrderCustomerCellProps {
  order: IOrder;
}

const OrderCustomerCell: React.FC<OrderCustomerCellProps> = ({ order }) => {
  const customerName = getCustomerName(order);
  const avatar = getCustomerAvatar(order);

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage
          src={avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${customerName}`}
        />
        <AvatarFallback className="uppercase text-xs">{customerName.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-semibold text-gray-900">{customerName}</span>
    </div>
  );
};

export default OrderCustomerCell;
