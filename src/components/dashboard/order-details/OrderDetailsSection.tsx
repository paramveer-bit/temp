import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import OrderItemsList from './OrderItemsList';
import OrderSummary from './OrderSummary';
import { IOrderDetails } from '@/types/types';

interface OrderDetailsSectionProps {
  order: IOrderDetails;
}

const OrderDetailsSection: React.FC<OrderDetailsSectionProps> = ({ order }) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Card>
        <OrderItemsList order={order} />
        <div className="px-6 pb-6">
          <Separator className="my-4" />
          <OrderSummary order={order} />
        </div>
      </Card>
    </div>
  );
};

export default OrderDetailsSection;
