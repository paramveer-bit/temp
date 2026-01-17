import { Row } from '@tanstack/react-table';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Thumbnail = ({ row }: { row: Row<import('@/types/product').IProduct> }) => {
  const product = row.original;
  const imageUrl = product.medias?.[0] || '';
  const fallbackText = product.title?.charAt(0)?.toUpperCase() || 'N';

  return (
    <Avatar className="w-20 h-20 rounded-md bg-[#fafafa] dark:bg-[#18181b]">
      <AvatarImage
        className="rounded-none object-contain"
        src={imageUrl}
        alt={product.title || 'Product'}
      />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};

export default Thumbnail;
