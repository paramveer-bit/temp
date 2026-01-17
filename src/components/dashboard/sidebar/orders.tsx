import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar';
import { useSeller } from '@/hooks/use-query';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Orders = () => {
  const pathname = usePathname();
  const { isPending } = useSeller();
  if (isPending) return <></>;

  const isOrderRoute =
    pathname?.startsWith('/dashboard/orders') || pathname?.startsWith('/dashboard/order-details');

  return (
    <Collapsible className="group/collapsible" defaultOpen={isOrderRoute}>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <div className="flex items-center text-white space-x-3">
              <ReceiptIcon className="w-6 h-6" />
              <p className="text-lg">Orders</p>
            </div>
            <ExpandMoreIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent>
          <SidebarGroupContent className="mt-2">
            <Link
              href="/dashboard/orders"
              className={`flex items-center space-x-3 p-3 text-base rounded-md transition-colors ${
                pathname === '/dashboard/orders'
                  ? 'bg-[#201781] text-[#F87D3F]'
                  : 'text-white hover:bg-[#2b2375]'
              }`}
            >
              <div className="w-[20px]" />
              <p>Orders</p>
            </Link>

            <Link
              href="/dashboard/order-details/DEMO-27839-00"
              className={`flex items-center space-x-3 p-3 text-base rounded-md transition-colors ${
                pathname?.startsWith('/dashboard/order-details')
                  ? 'bg-[#201781] text-[#F87D3F]'
                  : 'text-white hover:bg-[#2b2375]'
              }`}
            >
              <div className="w-[20px]" />
              <p>Order Details</p>
            </Link>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default Orders;
