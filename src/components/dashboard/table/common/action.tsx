import { Row } from '@tanstack/react-table';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Action = ({ row, href }: { row: Row<import('@/types/product').IProduct>; href: string }) => {
  const productId = row.original._id;

  if (!productId) {
    return null;
  }

  return (
    <div className="flex  items-center justify-start space-x-3">
      <Link href={`${href}/${productId}`} className="bg-linear p-2 rounded-lg">
        <EyeIcon className="w-5 h-5 text-white" />
      </Link>
    </div>
  );
};

export default Action;
