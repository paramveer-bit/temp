import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import { IOrderDetails } from '@/types/types';

interface ContactInfoCardProps {
  order: IOrderDetails;
  onEdit: () => void;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ order, onEdit }) => {
  const customer = order.customerInfo || { email: '', phone: '' };
  const emailPrefix = customer.email?.split('@')[0] || 'user';
  const instagramHandle = `@${emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Contact Information</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-[#201781] text-xs h-auto p-0 hover:text-[#201781]"
        >
          Edit Info &gt;
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center gap-3">
          <EmailIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate">{customer.email || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-3">
          <PhoneIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700">{customer.phone || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-3">
          <InstagramIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700">{instagramHandle}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoCard;
