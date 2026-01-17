import ProductLayout from '@/components/dashboard/common/product-layout';
import { tvColumns } from '@/components/dashboard/table/columns/tv-columns';
import DataTable from '@/components/dashboard/table/common/datatable';
import { getTv } from '@/hooks/use-server';

import React from 'react';

const TVPage = async () => {
  const data = await getTv();
  return (
    <ProductLayout title="TV" link="/dashboard/product/tv/create">
      <DataTable data={data} columns={tvColumns} />
    </ProductLayout>
  );
};

export default TVPage;
