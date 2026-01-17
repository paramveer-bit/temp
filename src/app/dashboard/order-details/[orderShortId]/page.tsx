'use client';

import React from 'react';
import { useOrderDetailsPage } from '@/hooks/useOrderDetailsPage';
import { formatShippingAddress, getDefaultBillingAddress } from '@/utils/orderHelpers';
import OrderDetailsHeader from '@/components/dashboard/order-details/OrderDetailsHeader';
import OrderDetailsSection from '@/components/dashboard/order-details/OrderDetailsSection';
import CustomerInformationSection from '@/components/dashboard/order-details/CustomerInformationSection';
import EditOrderModal from '@/components/dashboard/order-details/EditOrderModal';
import EditContactInfoModal from '@/components/dashboard/order-details/EditContactInfoModal';
import EditAddressModal from '@/components/dashboard/order-details/EditAddressModal';
import LoadingState from '@/components/dashboard/common/LoadingState';
import NotFoundState from '@/components/dashboard/order-details/NotFoundState';

const OrderDetailsPage: React.FC = () => {
  const {
    order,
    isLoading,
    orderShortId,
    handlePrint,
    handleEditOrder,
    handleEditInfo,
    editOrderModalOpen,
    setEditOrderModalOpen,
    editContactModalOpen,
    setEditContactModalOpen,
    editShippingModalOpen,
    setEditShippingModalOpen,
    editBillingModalOpen,
    setEditBillingModalOpen,
    handleSaveOrder,
    handleSaveContactInfo,
    handleSaveAddress,
  } = useOrderDetailsPage();

  if (isLoading) {
    return (
      <main className="flex w-full flex-col items-stretch mt-5 px-4 lg:px-8 max-md:max-w-full">
        <LoadingState message="Loading order details..." />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex w-full flex-col items-stretch mt-5 px-4 lg:px-8 max-md:max-w-full">
        <NotFoundState />
      </main>
    );
  }

  const billingAddress = order.billingAddress ?? getDefaultBillingAddress();
  const shippingAddressFormatted = formatShippingAddress(order.address_details);

  return (
    <main className="flex w-full flex-col items-stretch mt-5 px-4 lg:px-8 max-md:max-w-full">
      <OrderDetailsHeader
        orderShortId={orderShortId}
        onPrint={handlePrint}
        onEdit={handleEditOrder}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details Section */}
        <OrderDetailsSection order={order} />

        {/* Customer Information Section */}
        <CustomerInformationSection
          order={order}
          shippingAddress={shippingAddressFormatted}
          billingAddress={billingAddress}
          onEditInfo={handleEditInfo}
        />
      </div>

      {/* Edit Modals */}
      <EditOrderModal
        open={editOrderModalOpen}
        onClose={() => setEditOrderModalOpen(false)}
        order={order}
        onSave={handleSaveOrder}
      />

      <EditContactInfoModal
        open={editContactModalOpen}
        onClose={() => setEditContactModalOpen(false)}
        order={order}
        onSave={handleSaveContactInfo}
      />

      <EditAddressModal
        open={editShippingModalOpen}
        onClose={() => setEditShippingModalOpen(false)}
        order={order}
        addressType="shipping"
        onSave={handleSaveAddress}
      />

      <EditAddressModal
        open={editBillingModalOpen}
        onClose={() => setEditBillingModalOpen(false)}
        order={order}
        addressType="billing"
        onSave={handleSaveAddress}
      />
    </main>
  );
};

export default OrderDetailsPage;
