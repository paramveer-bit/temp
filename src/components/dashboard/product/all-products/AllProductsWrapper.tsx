'use client';

import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import DataTable from '@/components/dashboard/table/common/datatable';
import AllProductsMobile from './AllProductsMobile';
import type { IProduct } from '@/types/product';
import type { ColumnDef } from '@tanstack/react-table';

interface IProductWithStats extends IProduct {
  stats?: {
    price: number;
    sold: number;
    sales: number;
    change: number;
    orderCount: number;
  };
}

interface AllProductsWrapperProps {
  data: IProductWithStats[];
  columns: ColumnDef<IProductWithStats>[];
}

const AllProductsWrapper: React.FC<AllProductsWrapperProps> = ({ data, columns }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <AllProductsMobile products={data} />;
  }

  return <DataTable data={data} columns={columns} />;
};

export default AllProductsWrapper;
