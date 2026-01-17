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
import { NewspaperFormValues } from '@/utils/validation';
import { languages, newspaperType, printCirculations, sections } from '@/utils/data';
import Dimensions from './dimensions';
import Circulation from './circulation';

const Information = ({ form }: { form: UseFormReturn<NewspaperFormValues> }) => {
  return (
    <div className="space-y-6 max-w-4xl w-full">
      <h2 className="text-lg font-semibold">Product Information</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormField
          name="properties.section"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Newspaper Section</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="py-5 ">
                    <SelectValue placeholder="Select newspaper section" className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[40vh]">
                  {sections.map((el) => (
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
        <FormField
          name="properties.language"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="py-5 ">
                    <SelectValue placeholder="Select language type" className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[40vh]">
                  {languages.map((el) => (
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
        <FormField
          name="properties.printCirculation"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Print Circulation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="py-5 ">
                    <SelectValue placeholder="Select print circulation" className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[40vh]">
                  {printCirculations.map((el) => (
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
        <FormField
          name="properties.adType"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="py-5 ">
                    <SelectValue placeholder="Select newspaper type" className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[40vh]">
                  {newspaperType.map((el) => (
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
      <Dimensions form={form} />
      <Circulation form={form} />

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
