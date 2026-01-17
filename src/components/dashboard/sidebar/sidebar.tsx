'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import TryIcon from '@mui/icons-material/Try';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Product from './product';
import Orders from './orders';
import Customers from './customers';

const NavItem = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <SidebarMenu
      className={`p-4 rounded-md transition-colors ${
        active ? 'bg-[#201781]' : 'hover:bg-[#2b2375]'
      }`}
    >
      <Link href={href} className="flex items-center space-x-3 text-lg font-semibold">
        <Icon className={`w-6 h-6 ${active ? 'text-[#F87D3F]' : 'text-white'}`} />
        <span className={active ? 'text-[#F87D3F]' : 'text-white'}>{label}</span>
      </Link>
    </SidebarMenu>
  );
};

const AppSidebar = () => {
  return (
    <Sidebar variant="inset" className="h-screen flex flex-col">
      <Link href="/">
        <SidebarHeader className="flex flex-col justify-center items-center">
          <Image src="/logo/logo-white.png" alt="Mark My Ad" width={160} height={80} />
        </SidebarHeader>
      </Link>

      <SidebarContent className="mt-6 flex-1 overflow-y-auto scrollbar-hide">
        <NavItem href="/dashboard" icon={DashboardIcon} label="Overview" />
        <Product />
        <Orders />
        <Customers />
        <NavItem href="/dashboard/reviews" icon={TryIcon} label="Manage Reviews" />
        <NavItem href="/dashboard/checkout" icon={ShoppingCartIcon} label="Checkout" />
        <NavItem href="/dashboard/setting" icon={SettingsIcon} label="Settings" />
      </SidebarContent>

      <SidebarFooter className="flex flex-col text-sm text-white leading-none px-6 max-md:px-5">
        <div className="self-stretch h-px bg-[#EBEAED]" />
        <div className="mt-6 ml-3 cursor-pointer hover:text-gray-300 transition-colors">
          Technical help
        </div>
        <div className="mt-3 ml-3 cursor-pointer hover:text-gray-300 transition-colors">
          <Link href="/contact">Contact us</Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
