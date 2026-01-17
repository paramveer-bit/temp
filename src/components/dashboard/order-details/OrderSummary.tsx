import React from 'react';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/utils/orderHelpers';
import { IOrderDetails } from '@/types/types';

interface OrderSummaryProps {
  order: IOrderDetails;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const summary = order.orderSummary || { subtotal: 0, tax: 0, shipping: 0, discount: 0, total: 0 };

  return (
    <div className="space-y-2 mt-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium text-gray-900">{formatCurrency(summary.subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Shipping fee</span>
        <span className="font-medium text-gray-900">{formatCurrency(summary.shipping)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tax</span>
        <span className="font-medium text-gray-900">{formatCurrency(summary.tax)}</span>
      </div>
      {summary.discount > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-green-600">-{formatCurrency(summary.discount)}</span>
        </div>
      )}
      <Separator className="my-2" />
      <div className="flex justify-between">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="font-semibold text-gray-900">{formatCurrency(summary.total)}</span>
      </div>
      <div className="flex justify-between text-sm mt-1">
        <span className="text-gray-600">Amount to be paid</span>
        <span className="font-semibold text-[#201781]">{formatCurrency(summary.total)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
