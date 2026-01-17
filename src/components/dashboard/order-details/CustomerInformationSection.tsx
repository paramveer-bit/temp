import React from 'react';
import CustomerInfoCard from './CustomerInfoCard';
import ContactInfoCard from './ContactInfoCard';
import AddressCard from './AddressCard';
import PaymentMethodCard from './PaymentMethodCard';
import { IOrderDetails } from '@/types/types';

interface CustomerInformationSectionProps {
  order: IOrderDetails;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
  };
  billingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
  };
  onEditInfo: (section: string) => void;
}

const CustomerInformationSection: React.FC<CustomerInformationSectionProps> = ({
  order,
  shippingAddress,
  billingAddress,
  onEditInfo,
}) => {
  return (
    <div className="space-y-6">
      <CustomerInfoCard order={order} />

      <ContactInfoCard order={order} onEdit={() => onEditInfo('contact')} />

      <AddressCard
        title="Shipping Address"
        address={shippingAddress}
        onEdit={() => onEditInfo('shipping')}
      />

      <AddressCard
        title="Billing Address"
        address={billingAddress}
        onEdit={() => onEditInfo('billing')}
      />

      <PaymentMethodCard order={order} onEdit={() => onEditInfo('payment')} />
    </div>
  );
};

export default CustomerInformationSection;
