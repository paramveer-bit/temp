import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar';
import { useSeller } from '@/hooks/use-query';
import { subCategory } from '@/utils/data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Customers = () => {
  const pathname = usePathname();
  const { data: seller, isPending } = useSeller();
  if (isPending) return <></>;

  const isCustomerRoute = pathname?.startsWith('/dashboard/customers');

  return (
    <Collapsible className="group/collapsible" defaultOpen={isCustomerRoute}>
      <SidebarGroup>
        <SidebarGroupLabel asChild className="">
          <CollapsibleTrigger>
            <div className="flex items-center text-white space-x-3">
              <AccountBoxIcon className="w-6 h-6" />
              <p className="text-lg">Customers</p>
            </div>
            <ExpandMoreIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent className="mt-2 ">
            <Link
              href="/dashboard/product"
              className={`flex items-center space-x-3  text-center  p-3 text-base  ${pathname === '/dashboard/product' && 'bg-[#201781] text-[#F87D3F]'}}`}
            >
              <div className="w-[20px]" />
              <p className={`${pathname === '/dashboard/product' && 'text-[#F87D3F]'}`}>
                Categories
              </p>
            </Link>
            {subCategory
              .filter((item) => seller?.sub_category.includes(item.value))
              .map((el) => (
                <Link
                  href={el.url}
                  className={`flex items-center space-x-3  text-center  p-3 text-base  ${pathname === el.url && 'bg-[#201781] text-[#F87D3F]'}}`}
                  key={el.value}
                >
                  <div className="w-[20px]" />
                  <p className={`${pathname === el.url && 'text-[#F87D3F]'}`}>{el.value}</p>
                </Link>
              ))}
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default Customers;
