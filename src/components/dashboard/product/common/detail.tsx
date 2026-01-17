import React from 'react';
import ProductImage from './product-image';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const Detail = ({ form }: { form: any }) => {
  return (
    <div className="space-y-12">
      <div className="flex gap-4">
        <ProductImage form={form} name="medias" />
        <div className="space-y-2">
          <p>
            <span className="text-[#84818A]">Products</span> / Products Details
          </p>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Product Name"
                    {...field}
                    className="border-r-0 border-l-0 border-t-0 py-6 border-dashed bg-none shadow-none text-xl lg:text-3xl px-0 rounded-none focus-visible:ring-0 border-b"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="w-full h-[2px] bg-[#EBEAED]" />
    </div>
  );
};

export default Detail;
