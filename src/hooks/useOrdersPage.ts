import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFilterOrders, useDeleteOrder } from '@/hooks/use-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { exportOrdersToCSV } from '@/utils/orderHelpers';

type OrderTab = 'all' | 'Paid' | 'Pending' | 'Cancelled' | 'Refunded';

export const useOrdersPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<OrderTab>('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Redirect if not logged in
  useEffect(() => {
    const hasToken = typeof document !== 'undefined' && document.cookie.includes('token=');
    if (!hasToken) {
      router.replace('/sign-in');
    }
  }, [router]);

  //  Compute status filter based on active tab
  const statusFilter = useMemo(() => {
    switch (activeTab) {
      case 'Paid':
        return 'Delivered';
      case 'Cancelled':
        return 'Failed';
      case 'Pending':
        return 'Pending';
      default:
        return undefined;
    }
  }, [activeTab]);

  // Query params for filtering
  const filterParams = useMemo(
    () => ({
      search: searchQuery || undefined,
      status: statusFilter,
      page: currentPage,
      limit: itemsPerPage,
      sortBy: 'createdAt',
      sortOrder: 'desc' as const,
    }),
    [statusFilter, searchQuery, currentPage, itemsPerPage],
  );

  const { data: ordersData, isLoading, refetch } = useFilterOrders(filterParams);
  const deleteOrderMutation = useDeleteOrder();

  // Wrap orders in useMemo to prevent ESLint dependency warnings
  const orders = useMemo(() => ordersData?.orders || [], [ordersData]);

  // Filtered orders (for refunded)
  const filteredOrders = useMemo(() => {
    if (activeTab === 'Refunded') {
      return orders.filter((order: any) => order.paymentStatus === 'Refunded');
    }
    return orders;
  }, [orders, activeTab]);

  // Pagination handling
  const pagination = useMemo(() => {
    const basePagination = ordersData?.pagination || {
      currentPage,
      totalPages: 1,
      total: 0,
      hasNext: false,
      hasPrev: false,
    };

    if (activeTab === 'Refunded') {
      return {
        ...basePagination,
        total: filteredOrders.length,
      };
    }

    return basePagination;
  }, [ordersData?.pagination, activeTab, filteredOrders.length, currentPage]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput.trim());
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Export orders as CSV
  const handleExport = () => {
    if (orders.length === 0) {
      toast.warning('No orders to export', {
        style: { background: '#fff7ed', color: '#9a3412' },
      });
      return;
    }
    exportOrdersToCSV(orders);
    toast.success('Orders exported successfully', {
      style: { background: '#e7f6f1', color: '#16a87e' },
    });
  };

  // Refresh orders
  const handleRefresh = () => {
    setCurrentPage(1);
    setSearchInput('');
    setSearchQuery('');
    setActiveTab('all');
    queryClient.invalidateQueries({ queryKey: ['orders'] });
    refetch();
    toast.success('Orders refreshed', {
      style: { background: '#e7f6f1', color: '#16a87e' },
    });
  };

  // Tab change
  const handleTabChange = (tab: OrderTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Navigate to order details
  const handleViewOrder = (orderShortId: string) => {
    const safeId = encodeURIComponent(orderShortId);
    router.push(`/dashboard/order-details/${safeId}`);
  };

  // Delete order
  const handleDeleteOrder = async (orderShortId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrderMutation.mutateAsync(orderShortId);
      } catch {
        // handled in mutation
      }
    }
  };

  return {
    activeTab,
    searchInput,
    currentPage,
    itemsPerPage,
    orders: filteredOrders,
    pagination,
    isLoading,
    setSearchInput,
    setCurrentPage,
    handleExport,
    handleRefresh,
    handleTabChange,
    handleViewOrder,
    handleDeleteOrder,
  };
};
