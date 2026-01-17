import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import Description from '../common/description';
import { Input } from '@/components/ui/input';
import { Headphones } from 'lucide-react';
import TimeSlot from '../common/timeslot';
import Cast from '../common/cast';
import { TVFormValues } from '@/utils/validation';
import Unit from './units';

const Information = ({ form }: { form: UseFormReturn<TVFormValues> }) => {
  return (
    <div className="space-y-6 max-w-4xl w-full">
      <h2 className="text-lg font-semibold">Product Information</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          name="properties.channel"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel Name</FormLabel>
              <FormControl>
                <Input placeholder="channel" {...field} className="rounded-sm py-5" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="properties.viewership"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Viewership</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="viewership"
                    className="peer pe-12 ps-9 py-5 rounded-sm"
                    placeholder="1.2M"
                    {...field}
                  />
                  <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                    <Headphones size={15} />
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TimeSlot form={form} />
        <Unit form={form} />
      </div>

      <Cast form={form} />

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
