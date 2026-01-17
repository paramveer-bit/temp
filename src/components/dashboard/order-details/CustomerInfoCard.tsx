import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HistoryIcon from '@mui/icons-material/History';
import { IOrderDetails } from '@/types/types';

interface CustomerInfoCardProps {
  order: IOrderDetails;
}

const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({ order }) => {
  const router = useRouter();
  const customer = order.customerInfo || {
    id: '',
    name: 'Unknown',
    email: '',
    phone: '',
    avatar: null,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={
                customer.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${customer.name || 'User'}`
              }
            />
            <AvatarFallback className="uppercase bg-gray-200">
              {(customer.name || 'U').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{customer.name}</p>
            <p className="text-sm text-gray-500 truncate">{customer.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-700 hover:text-gray-900"
          onClick={() => router.push(`/dashboard/customers?userId=${customer.id}`)}
        >
          <HistoryIcon className="h-4 w-4 mr-2" />
          Order History
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoCard;
