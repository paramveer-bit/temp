import ProductLayout from '@/components/dashboard/common/product-layout';
import DataTable from '@/components/dashboard/table/common/datatable';
import { oohColumns } from '@/components/dashboard/table/columns/ooh-columns';
import { getOOH } from '@/hooks/use-server';
import React from 'react';

const OOHPage = async () => {
  const data = await getOOH();
  return (
    <ProductLayout title="OOH" link="/dashboard/product/ooh/create">
      <DataTable data={data} columns={oohColumns} />
    </ProductLayout>
  );
};

export default OOHPage;
