import { InfluencerFormValues } from '@/utils/validation';
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
import { tags } from '@/utils/data';
import Location from '../common/location';
import Description from '../common/description';
import Brand from './brand';

const Information = ({ form }: { form: UseFormReturn<InfluencerFormValues> }) => {
  const tag = form.watch('properties.tag');
  return (
    <div className="space-y-6 max-w-4xl w-full">
      <h2 className="text-lg font-semibold">Product Information</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          name="properties.tag.category"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Profession</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="py-5 ">
                    <SelectValue placeholder="Select Profession" className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[60vh]">
                  {tags.map((el) => (
                    <SelectItem value={el.category} key={el.category}>
                      {el.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="properties.tag.subCategory"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Content Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select Content Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[40vh]">
                  {tags
                    .find((item) => item.category === tag?.category)
                    ?.subCategory.map((el) => (
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

        <Location form={form} name="properties.location" />
        <FormField
          name="properties.gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select a Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                  ].map((el) => (
                    <SelectItem value={el.value} key={el.value}>
                      {el.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Brand form={form} />

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
