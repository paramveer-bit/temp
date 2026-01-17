import React from 'react';
import Image from 'next/image';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/orderHelpers';
import { IOrderDetails } from '@/types/types';

interface OrderItemsListProps {
  order: IOrderDetails;
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({ order }) => {
  const items = order.orderItems || [];

  return (
    <>
      <CardHeader>
        <CardTitle>Order details ({items.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No order items found</div>
          ) : (
            items.map((item, index) => {
              const totalPrice = item.price.reduce((sum, priceItem) => {
                return sum + priceItem.amount * priceItem.quantity;
              }, 0);

              return (
                <div key={item.id || index} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                      {item.price[0]?.price_type && <span>Type: {item.price[0].price_type}</span>}
                      {item.subCategory && <span>• {item.subCategory}</span>}
                      {item.price[0]?.quantity && (
                        <span>• Quantity: x{item.price[0].quantity}</span>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </>
  );
};

export default OrderItemsList;
