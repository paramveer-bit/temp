import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrderDetailsHeaderProps {
  orderShortId: string;
  onPrint: () => void;
  onEdit: () => void;
}

const OrderDetailsHeader: React.FC<OrderDetailsHeaderProps> = ({
  orderShortId,
  onPrint,
  onEdit,
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard/orders')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowBackIcon className="h-4 w-4 mr-2" />
          Orders
        </Button>
        <span className="text-gray-400 mx-2">/</span>
        <span className="text-gray-600">Order Details</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#2E2C34] mb-2">
            {isMobile ? `Order #${orderShortId.substring(0, 10)}...` : `Order #${orderShortId}`}
          </h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onPrint} className="border-gray-300">
            <PrintIcon className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={onEdit} className="bg-[#F87D3F] hover:bg-[#e66d2f] text-white">
            <EditIcon className="h-4 w-4 mr-2" />
            Edit Order
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsHeader;
