import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderStatusBadge from './OrderStatusBadge';
import {
  formatCurrency,
  formatDate,
  getCustomerName,
  getCustomerAvatar,
} from '@/utils/orderHelpers';
import { IOrder } from '@/types/types';

interface OrderCardProps {
  order: IOrder;
  orderNumber: number;
  onView: (orderShortId: string) => void;
  onDelete: (orderShortId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, orderNumber, onView, onDelete }) => {
  const customerName = getCustomerName(order);
  const avatar = getCustomerAvatar(order);

  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">{orderNumber}.</span>
          <div>
            <p className="text-sm font-semibold text-gray-900">{order.orderShortId}</p>
            <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} paymentStatus={(order as any).paymentStatus} />
      </div>

      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${customerName}`}
          />
          <AvatarFallback className="uppercase text-xs">{customerName.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-gray-900">{customerName}</p>
          <p className="text-xs text-gray-500">{order.address_details.email || ''}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-500">Payment Method</p>
          <p className="text-sm font-medium text-gray-900">
            Card •••• {(order as any)?.paymentMethod?.lastFourDigits || '819'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-sm font-semibold text-gray-900">
            {formatCurrency(order.total_amount)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(order.orderShortId)}
          className="flex-1"
        >
          <EditIcon className="h-4 w-4 mr-1" />
          View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(order.orderShortId)}
          className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <DeleteIcon className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
