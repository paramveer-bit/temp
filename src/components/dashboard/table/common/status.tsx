import { Row } from '@tanstack/react-table';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

const Status = ({ row }: { row: Row<import('@/types/product').IProduct> }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant={row.original.status === 'Inactive' ? 'pending' : 'success'}>
            {row.original.status}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {row.original.status === 'Inactive'
            ? 'Wait for admin to approve your product'
            : 'Admin has approved your product'}{' '}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Status;
