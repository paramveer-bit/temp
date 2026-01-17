import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import OrderTableRow from './OrderTableRow';
import { IOrder } from '@/types/types';

interface OrderTableProps {
  orders: IOrder[];
  currentPage: number;
  itemsPerPage: number;
  onView: (orderShortId: string) => void;
  onDelete: (orderShortId: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  currentPage,
  itemsPerPage,
  onView,
  onDelete,
}) => {
  if (orders.length === 0) {
    return (
      <div className="rounded bg-white shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs font-semibold text-gray-600">NO.</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">ORDER ID</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">CUSTOMER NAME</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">STATUS</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">DATE</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">METHOD</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">PRICE</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                <div className="text-gray-500">No orders found</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded bg-white shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-xs font-semibold text-gray-600">NO.</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">ORDER ID</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">CUSTOMER NAME</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">STATUS</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">DATE</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">METHOD</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">PRICE</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
            const orderNumber = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <OrderTableRow
                key={order._id}
                order={order}
                orderNumber={orderNumber}
                onView={onView}
                onDelete={onDelete}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
