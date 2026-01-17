'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon, EyeIcon } from 'lucide-react';
import Link from 'next/link';
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

interface AllProductsMobileProps {
  products: IProductWithStats[];
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

const AllProductsMobile: React.FC<AllProductsMobileProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const productCode = getProductCode(product);
        const categoryDisplay = getCategoryDisplay(product);
        const change = product.stats?.change ?? 0;
        const isPositive = change >= 0;
        const changeValue = Math.abs(change).toFixed(1);
        const price = product.stats?.price ?? product.properties?.price ?? 0;
        const sold = product.stats?.sold ?? 0;
        const sales = product.stats?.sales ?? 0;
        const href = redirect(product.subCategory || product.category || '');

        return (
          <div
            key={product._id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-start space-x-3 mb-3">
              <Avatar className="w-16 h-16 rounded-md bg-[#fafafa] dark:bg-[#18181b] flex-shrink-0">
                <AvatarImage
                  className="rounded-none object-contain"
                  src={product.medias?.[0] || ''}
                  alt={product.title}
                />
                <AvatarFallback className="text-xs">
                  {product.title?.charAt(0)?.toUpperCase() || 'N'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate mb-1">
                  {product.title || 'Untitled Product'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">#{productCode}</p>
                <Badge variant="normal" className="text-xs">
                  {categoryDisplay}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">CHANGE</p>
                <div className="flex items-center space-x-1">
                  {isPositive ? (
                    <ArrowUpIcon className="w-3 h-3 text-green-600" />
                  ) : (
                    <ArrowDownIcon className="w-3 h-3 text-orange-600" />
                  )}
                  <span
                    className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-orange-600'}`}
                  >
                    {changeValue}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">PRICE</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  ₹
                  {price > 0
                    ? price.toLocaleString('en-IN', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                    : '0'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">SOLD</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {sold.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">SALES</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  ₹
                  {sales.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {product._id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Link
                  href={`${href}/${product._id}`}
                  className="bg-linear p-2 rounded-lg inline-flex items-center justify-center w-full text-white text-sm font-medium"
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  View Details
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AllProductsMobile;
