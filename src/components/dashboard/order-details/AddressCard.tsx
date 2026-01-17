import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface AddressCardProps {
  title: string;
  address: {
    address?: string;
    city?: string;
    state?: string;
    pincode?: number;
    country?: string;
  };
  onEdit: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ title, address, onEdit }) => {
  const fullAddress = address.address || '';
  const cityState = [address.city, address.state, address.pincode].filter(Boolean).join(', ');
  const country = address.country || 'India';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
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
        <div className="flex items-start gap-3">
          <LocationOnIcon className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
          <div className="text-sm text-gray-700 flex-1 min-w-0">
            {fullAddress && <p className="mb-1 break-words">{fullAddress}</p>}
            {cityState && <p className="mb-2 break-words">{cityState}</p>}
            <p className="flex items-center gap-2">
              <span className="text-base">🇮🇳</span>
              <span>{country}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
