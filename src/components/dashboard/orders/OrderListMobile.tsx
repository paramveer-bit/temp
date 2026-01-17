import React from 'react';
import OrderCard from './OrderCard';
import { IOrder } from '@/types/types';

interface OrderListMobileProps {
  orders: IOrder[];
  currentPage: number;
  itemsPerPage: number;
  onView: (orderShortId: string) => void;
  onDelete: (orderShortId: string) => void;
}

const OrderListMobile: React.FC<OrderListMobileProps> = ({
  orders,
  currentPage,
  itemsPerPage,
  onView,
  onDelete,
}) => {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="text-gray-500">No orders found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => {
        const orderNumber = (currentPage - 1) * itemsPerPage + index + 1;
        return (
          <OrderCard
            key={order._id}
            order={order}
            orderNumber={orderNumber}
            onView={onView}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default OrderListMobile;
