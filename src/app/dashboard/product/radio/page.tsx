import ProductLayout from '@/components/dashboard/common/product-layout';
import { radioColumns } from '@/components/dashboard/table/columns/radio-columns';
import DataTable from '@/components/dashboard/table/common/datatable';
import { getRadio } from '@/hooks/use-server';

import React from 'react';

const RadioPage = async () => {
  const data = await getRadio();
  return (
    <ProductLayout title="Radio" link="/dashboard/product/radio/create">
      <DataTable data={data} columns={radioColumns} />
    </ProductLayout>
  );
};

export default RadioPage;
