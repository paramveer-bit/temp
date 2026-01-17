import React from 'react';

interface OrderStatusBadgeProps {
  status: string;
  paymentStatus?: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, paymentStatus }) => {
  const getStatusLabel = () => {
    if (paymentStatus === 'Refunded') return 'refunded';
    if (status === 'Delivered' || status === 'Approved') return 'paid';
    if (status === 'Pending' || status === 'Payment' || status === 'Approval') return 'pending';
    if (status === 'Failed') return 'cancelled';
    return status.toLowerCase();
  };

  const getStatusStyle = () => {
    const label = getStatusLabel();
    switch (label) {
      case 'paid':
        return 'bg-green-50 text-green-600';
      case 'pending':
        return 'bg-orange-50 text-orange-600';
      case 'cancelled':
        return 'bg-red-50 text-red-600';
      case 'refunded':
        return 'bg-gray-50 text-gray-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle()}`}>
      {getStatusLabel()}
    </span>
  );
};

export default OrderStatusBadge;
