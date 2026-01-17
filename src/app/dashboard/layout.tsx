import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/dashboard/sidebar/sidebar';
import Navbar from '@/components/dashboard/sidebar/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="w-full p-4 lg:px-8 flex flex-col gap-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
