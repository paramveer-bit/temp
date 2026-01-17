import React, { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
interface Props {
  children: ReactNode;
  title: string;
  link: string;
}

const ProductLayout = ({ children, title, link }: Props) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
        <Link
          href={link}
          className="bg-linear hover:opacity-90 transition-opacity px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg flex items-center justify-center space-x-2 text-white font-medium shadow-md w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Add Product</span>
        </Link>
      </div>
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-3 sm:p-4 lg:p-6 min-h-[calc(100vh-200px)] sm:min-h-[calc(100vh-250px)]">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductLayout;
