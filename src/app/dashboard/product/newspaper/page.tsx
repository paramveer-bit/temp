import ProductLayout from '@/components/dashboard/common/product-layout';
import { newspaperColumns } from '@/components/dashboard/table/columns/newspaper-columns';
import DataTable from '@/components/dashboard/table/common/datatable';

import { getNewspaper } from '@/hooks/use-server';
import React from 'react';

const NewspaperPage = async () => {
  const data = await getNewspaper();
  return (
    <ProductLayout title="Newspaper" link="/dashboard/product/newspaper/create">
      <DataTable data={data} columns={newspaperColumns} />
    </ProductLayout>
  );
};

export default NewspaperPage;
