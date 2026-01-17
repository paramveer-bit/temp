import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type OrderTab = 'all' | 'Paid' | 'Pending' | 'Cancelled' | 'Refunded';

interface OrdersFilterTabsProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
}

const OrdersFilterTabs: React.FC<OrdersFilterTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex-shrink-0">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as OrderTab)}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#201781] data-[state=active]:text-white"
          >
            All orders
          </TabsTrigger>
          <TabsTrigger
            value="Paid"
            className="data-[state=active]:bg-[#201781] data-[state=active]:text-white"
          >
            Paid
          </TabsTrigger>
          <TabsTrigger
            value="Pending"
            className="data-[state=active]:bg-[#201781] data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="Cancelled"
            className="data-[state=active]:bg-[#201781] data-[state=active]:text-white"
          >
            Cancelled
          </TabsTrigger>
          <TabsTrigger
            value="Refunded"
            className="data-[state=active]:bg-[#201781] data-[state=active]:text-white hidden sm:inline-flex"
          >
            Refunded
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default OrdersFilterTabs;
