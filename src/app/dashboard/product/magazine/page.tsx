import React from 'react';
import ProductLayout from '@/components/dashboard/common/product-layout';
import DataTable from '@/components/dashboard/table/common/datatable';
import { getMagazine } from '@/hooks/use-server';
import { magazineColumns } from '@/components/dashboard/table/columns/magazine-columns';

const MagazinePage = async () => {
  const data = await getMagazine();
  return (
    <ProductLayout title="Magazine" link="/dashboard/product/magazine/create">
      <DataTable data={data} columns={magazineColumns} />
    </ProductLayout>
  );
};

export default MagazinePage;
