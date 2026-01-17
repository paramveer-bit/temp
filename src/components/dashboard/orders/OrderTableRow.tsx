import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import OrderStatusBadge from './OrderStatusBadge';
import OrderCustomerCell from './OrderCustomerCell';
import OrderPaymentCell from './OrderPaymentCell';
import OrderActions from './OrderActions';
import { formatCurrency, formatDate } from '@/utils/orderHelpers';
import { IOrder } from '@/types/types';

interface OrderTableRowProps {
  order: IOrder;
  orderNumber: number;
  onView: (orderShortId: string) => void;
  onDelete: (orderShortId: string) => void;
}

const OrderTableRow: React.FC<OrderTableRowProps> = ({ order, orderNumber, onView, onDelete }) => {
  return (
    <TableRow
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() => onView(order.orderShortId)}
    >
      <TableCell className="text-sm text-gray-600">{orderNumber}.</TableCell>
      <TableCell className="text-sm font-medium text-gray-900">{order.orderShortId}</TableCell>
      <TableCell>
        <OrderCustomerCell order={order} />
      </TableCell>
      <TableCell>
        <OrderStatusBadge status={order.status} paymentStatus={(order as any).paymentStatus} />
      </TableCell>
      <TableCell className="text-sm text-gray-600">{formatDate(order.createdAt)}</TableCell>
      <TableCell>
        <OrderPaymentCell order={order} />
      </TableCell>
      <TableCell className="text-sm font-semibold text-gray-900">
        {formatCurrency(order.total_amount)}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <OrderActions orderShortId={order.orderShortId} onView={onView} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
