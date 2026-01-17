import { IOrder } from '@/types/types';

export const getCustomerName = (order: IOrder): string => {
  const user = typeof order.userId === 'object' && order.userId ? (order.userId as any) : null;
  if (user) {
    const first = 'firstname' in user ? user.firstname : '';
    const last = 'lastname' in user ? user.lastname : '';
    const full = `${first || ''} ${last || ''}`.trim();
    if (full) return full;
    if ('name' in user && user.name) return user.name as string;
  }
  return order.address_details?.name || 'Unknown';
};

export const getCustomerAvatar = (order: IOrder): string | null => {
  const user = typeof order.userId === 'object' && order.userId ? (order.userId as any) : null;
  if (user && 'avatar' in user && user.avatar) {
    return user.avatar as string;
  }
  return null;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const exportOrdersToCSV = (orders: IOrder[]): void => {
  if (!orders || orders.length === 0) {
    return;
  }

  const headers = ['Order ID', 'Customer Name', 'Status', 'Payment Status', 'Date', 'Total (INR)'];
  const rows = orders.map((order) => {
    const name = getCustomerName(order);
    const date = formatDate(order.createdAt);
    return [
      `"${order.orderShortId}"`,
      `"${name}"`,
      `"${order.status || ''}"`,
      `"${(order as any).paymentStatus || ''}"`,
      `"${date}"`,
      order.total_amount ?? '',
    ].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'orders.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatShippingAddress = (addressDetails: any) => {
  if (!addressDetails) {
    return {
      address: '',
      city: '',
      state: '',
      pincode: 0,
      country: 'India',
    };
  }

  return {
    address: `${addressDetails.flat_No || ''} ${addressDetails.area || ''}`.trim(),
    city: addressDetails.city || '',
    state: addressDetails.state || '',
    pincode: addressDetails.pincode || 0,
    country: addressDetails.country || 'India',
  };
};

export const getDefaultBillingAddress = () => ({
  address: '',
  city: '',
  state: '',
  pincode: 0,
  country: 'India',
});

export const getDefaultCustomerInfo = () => ({
  id: '',
  name: 'Unknown',
  email: '',
  phone: '',
  avatar: null,
});
