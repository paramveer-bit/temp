import ProductLayout from '@/components/dashboard/common/product-layout';
import { influencerColumns } from '@/components/dashboard/table/columns/influencer-columns';
import DataTable from '@/components/dashboard/table/common/datatable';
import { getInfluencers } from '@/hooks/use-server';
import React from 'react';

const InfluencerPage = async () => {
  const data = await getInfluencers();
  return (
    <ProductLayout title="Influencers" link="/dashboard/product/influencer/create">
      <DataTable data={data} columns={influencerColumns} />
    </ProductLayout>
  );
};

export default InfluencerPage;
