'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import NotificationBell from '@/components/dashboard/notifications/NotificationBell';

interface Seller {
  _id?: string;
  name: string;
  category?: string;
  avatar?: string;
  bio?: string;
}

const Navbar = () => {
  const router = useRouter();
  const [seller, setSeller] = useState<Seller | null>(null);

  const fetchSeller = () => {
    fetch('/api/seller', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) {
          setSeller(data);
        }
      })
      .catch(() => {
        // Silent fail
      });
  };

  useEffect(() => {
    fetchSeller();

    const handleSellerUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const sellerData = customEvent?.detail;

      if (sellerData && sellerData._id) {
        setSeller({
          _id: sellerData._id,
          name: sellerData.name || '',
          category: sellerData.category,
          avatar: sellerData.avatar,
          bio: sellerData.bio,
        });
      } else {
        fetchSeller();
      }
    };

    window.addEventListener('seller-updated', handleSellerUpdate);

    return () => {
      window.removeEventListener('seller-updated', handleSellerUpdate);
    };
  }, []);

  const handleSignOut = () => {
    deleteCookie('token');
    router.push('/');
  };

  return (
    <div className="bg-[#160E77] w-full p-2 py-4 flex items-center justify-between">
      <SidebarTrigger className="text-white lg:hidden" />

      <div className="flex items-center ml-4 w-full max-w-md">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
            <SearchIcon className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <NotificationBell />

        {seller && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 text-white focus:outline-none">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      seller.avatar ||
                      `https://api.dicebear.com/7.x/initials/svg?seed=${seller.name}`
                    }
                    alt={seller.name}
                  />
                  <AvatarFallback className="uppercase font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {seller.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start text-left">
                  <span className="font-semibold text-lg">{seller?.name?.split(' ')[0]}</span>
                </div>
                <ArrowDropDownIcon className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex items-center gap-2 text-red-600 cursor-pointer"
              >
                <LogoutIcon className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
