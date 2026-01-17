import { OOHFormValues } from '@/utils/validation';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Description from '../common/description';
import { Input } from '@/components/ui/input';
import Location from '../common/location';
import Lighting from './lighting';
import AdType from './ad_type';

const Information = ({ form }: { form: UseFormReturn<OOHFormValues> }) => {
  return (
    <div className="space-y-6 max-w-4xl w-full">
      <h2 className="text-lg font-semibold">Product Information</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          name="properties.mediaType"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Profession</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="py-5 ">
                    <SelectValue placeholder="Select media type" className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[60vh]">
                  {['Image', 'Video'].map((el) => (
                    <SelectItem value={el} key={el}>
                      {el}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="properties.price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="input-13"
                    className="peer pe-12 ps-6 py-5 rounded-sm"
                    placeholder="0.00"
                    {...field}
                  />
                  <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                    ₹
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                    INR
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="properties.size"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input placeholder="35x20" {...field} className="rounded-sm py-5" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Location form={form} name="properties.location" />
        <FormField
          name="properties.coordination"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Coordinate</FormLabel>
              <FormControl>
                <Input
                  placeholder="19.03130140, 72.84751750"
                  {...field}
                  className="rounded-sm py-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="properties.subLocation"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="H-1118 - Surat, Udhna, Udhna Cross Road Junction "
                  {...field}
                  className="rounded-sm py-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Lighting form={form} />
        <AdType form={form} />
      </div>

      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <Description value={field.value} onChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Information;
