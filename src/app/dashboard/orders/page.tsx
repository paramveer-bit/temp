'use client';

import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useOrdersPage } from '@/hooks/useOrdersPage';
import OrdersHeader from '@/components/dashboard/orders/OrdersHeader';
import OrdersFilterTabs from '@/components/dashboard/orders/OrdersFilterTabs';
import OrdersToolbar from '@/components/dashboard/orders/OrdersToolbar';
import OrdersPagination from '@/components/dashboard/orders/OrdersPagination';
import OrderTable from '@/components/dashboard/orders/OrderTable';
import OrderListMobile from '@/components/dashboard/orders/OrderListMobile';
import LoadingState from '@/components/dashboard/common/LoadingState';

const OrdersPage: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    activeTab,
    searchInput,
    currentPage,
    itemsPerPage,
    orders,
    pagination,
    isLoading,
    setSearchInput,
    setCurrentPage,
    handleExport,
    handleRefresh,
    handleTabChange,
    handleViewOrder,
    handleDeleteOrder,
  } = useOrdersPage();

  if (isLoading) {
    return (
      <main className="flex w-full flex-col items-stretch mt-5 px-4 lg:px-8 max-md:max-w-full">
        <LoadingState message="Loading orders..." />
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col items-stretch mt-5 px-4 lg:px-8 max-md:max-w-full">
      <OrdersHeader />

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <OrdersFilterTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <OrdersToolbar
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />
      </div>

      {!isMobile ? (
        <OrderTable
          orders={orders}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onView={handleViewOrder}
          onDelete={handleDeleteOrder}
        />
      ) : (
        <OrderListMobile
          orders={orders}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onView={handleViewOrder}
          onDelete={handleDeleteOrder}
        />
      )}

      <OrdersPagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        total={pagination.total}
        displayCount={orders.length}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default OrdersPage;
