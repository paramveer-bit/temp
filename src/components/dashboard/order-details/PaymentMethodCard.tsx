import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { IOrderDetails } from '@/types/types';

interface PaymentMethodCardProps {
  order?: IOrderDetails;
  onEdit: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ order, onEdit }) => {
  const paymentMethod = (order as any)?.paymentMethod;
  const cardType = paymentMethod?.cardType || 'MasterCard';
  const lastFour = paymentMethod?.lastFourDigits || '819';
  const cardNumber = `**** **** **** ${lastFour}`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">{cardType}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-[#201781] text-xs h-auto p-0 hover:text-[#201781]"
        >
          Edit Info &gt;
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center flex-shrink-0">
              <CreditCardIcon className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-gray-700">Card Number {cardNumber}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodCard;
