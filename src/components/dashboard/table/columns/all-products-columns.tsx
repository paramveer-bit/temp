'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import Action from '../common/action';
import { redirect } from '@/utils/tools';

import type { IProduct } from '@/types/product';

interface IProductWithStats extends IProduct {
  stats?: {
    price: number;
    sold: number;
    sales: number;
    change: number;
    orderCount: number;
  };
}

const getProductCode = (product: IProductWithStats): string => {
  if (product.seo?.slug) {
    return product.seo.slug;
  }
  if (product._id) {
    return product._id.slice(-12).toUpperCase();
  }
  return 'N/A';
};

const getCategoryDisplay = (product: IProductWithStats): string => {
  if (product.subCategory) {
    return product.subCategory;
  }
  if (product.category) {
    return product.category;
  }
  return 'N/A';
};

const ItemCell = ({ row }: { row: any }) => {
  const product = row.original as IProductWithStats;
  const productCode = getProductCode(product);
  const categoryDisplay = getCategoryDisplay(product);

  return (
    <div className="flex items-center space-x-3 min-w-[250px]">
      <Avatar className="w-12 h-12 rounded-md bg-[#fafafa] dark:bg-[#18181b] flex-shrink-0">
        <AvatarImage
          className="rounded-none object-contain"
          src={product.medias?.[0] || ''}
          alt={product.title}
        />
        <AvatarFallback className="text-xs">
          {product.title?.charAt(0)?.toUpperCase() || 'N'}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-1 min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {product.title || 'Untitled Product'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">#{productCode}</p>
        <Badge variant="normal" className="w-fit text-xs mt-1">
          {categoryDisplay}
        </Badge>
      </div>
    </div>
  );
};

const ChangeCell = ({ row }: { row: any }) => {
  const product = row.original as IProductWithStats;
  const change = product.stats?.change ?? 0;
  const isPositive = change >= 0;
  const changeValue = Math.abs(change).toFixed(1);

  return (
    <div className="flex items-center space-x-1">
      {isPositive ? (
        <ArrowUpIcon className="w-4 h-4 text-green-600" />
      ) : (
        <ArrowDownIcon className="w-4 h-4 text-orange-600" />
      )}
      <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-orange-600'}`}>
        {changeValue}%
      </span>
    </div>
  );
};

const PriceCell = ({ row }: { row: any }) => {
  const product = row.original as IProductWithStats;
  const price = product.stats?.price ?? product.properties?.price ?? 0;

  return (
    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
      ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
    </span>
  );
};

const SoldCell = ({ row }: { row: any }) => {
  const product = row.original as IProductWithStats;
  const sold = product.stats?.sold ?? 0;

  return (
    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
      {sold.toLocaleString('en-IN')}
    </span>
  );
};

const SalesCell = ({ row }: { row: any }) => {
  const product = row.original as IProductWithStats;
  const sales = product.stats?.sales ?? 0;

  return (
    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
      ₹{sales.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
};

const getActionHref = (product: IProductWithStats): string => {
  return redirect(product.subCategory || product.category || '');
};

export const allProductsColumns: ColumnDef<IProductWithStats>[] = [
  {
    id: 'title',
    accessorKey: 'title',
    header: () => null,
    cell: () => null,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    id: 'productCode',
    header: 'PRODUCT CODE',
    cell: ({ row }) => {
      const productCode = getProductCode(row.original);
      return (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {productCode}
        </span>
      );
    },
    enableHiding: true,
  },
  {
    id: 'item',
    header: 'ITEM',
    cell: ({ row }) => <ItemCell row={row} />,
    enableHiding: false,
  },
  {
    id: 'type',
    header: 'TYPE',
    cell: ({ row }) => {
      const categoryDisplay = getCategoryDisplay(row.original);
      return (
        <Badge variant="normal" className="text-xs whitespace-nowrap">
          {categoryDisplay}
        </Badge>
      );
    },
    enableHiding: true,
  },
  {
    id: 'change',
    header: 'CHANGE',
    cell: ({ row }) => <ChangeCell row={row} />,
    enableHiding: true,
  },
  {
    id: 'price',
    header: 'PRICE',
    cell: ({ row }) => <PriceCell row={row} />,
    enableHiding: true,
  },
  {
    id: 'sold',
    header: 'SOLD',
    cell: ({ row }) => <SoldCell row={row} />,
    enableHiding: true,
  },
  {
    id: 'sales',
    header: 'SALES',
    cell: ({ row }) => <SalesCell row={row} />,
    enableHiding: true,
  },
  {
    id: 'Action',
    header: () => '',
    cell: ({ row }) => {
      const href = getActionHref(row.original);
      return <Action row={row} href={href} />;
    },
    enableHiding: false,
  },
];
