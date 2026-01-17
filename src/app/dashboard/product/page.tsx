import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSeller } from '@/hooks/use-server';
import { subCategory } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

const ProductPage = async () => {
  const seller = await getSeller();
  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-3xl font-semibold">Categories</h2>
      <div className="w-full h-px bg-[#EBEAED]" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full ">
        {subCategory
          .filter((item) => seller?.sub_category.includes(item.value))
          .map((el) => (
            <Link href={el.url} key={el.value}>
              <Card>
                <CardHeader>
                  <Image src={el.icon} width={25} height={25} alt={el.value} unoptimized />
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle className="text-xl">{el.value}</CardTitle>
                  <p className="text-[#84818A]">34 Products - 120 Variants</p>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
