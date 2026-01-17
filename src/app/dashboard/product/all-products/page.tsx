import React from 'react';
import ProductLayout from '@/components/dashboard/common/product-layout';
import { getAllProducts, getSeller } from '@/hooks/use-server';
import { allProductsColumns } from '@/components/dashboard/table/columns/all-products-columns';
import { subCategory } from '@/utils/data';
import AllProductsWrapper from '@/components/dashboard/product/all-products/AllProductsWrapper';

export const dynamic = 'force-dynamic';

const AllProductsPage = async () => {
  try {
    const data = await getAllProducts();
    const seller = await getSeller();

    const getAddProductLink = () => {
      if (!seller?.sub_category || seller.sub_category.length === 0) {
        return '/dashboard/product';
      }

      const firstCategory = seller.sub_category[0];
      const categoryData = subCategory.find((item) => item.value === firstCategory);

      if (categoryData) {
        return `${categoryData.url}/create`;
      }
      return '/dashboard/product';
    };

    return (
      <ProductLayout title="All Products" link={getAddProductLink()}>
        <AllProductsWrapper data={data || []} columns={allProductsColumns} />
      </ProductLayout>
    );
  } catch (error) {
    return (
      <ProductLayout title="All Products" link="/dashboard/product">
        <AllProductsWrapper data={[]} columns={allProductsColumns} />
      </ProductLayout>
    );
  }
};

export default AllProductsPage;
