'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NewspaperFormValues } from '@/utils/validation';
import { Calculator, Plus, Trash } from 'lucide-react';
import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import Location from '../common/location';

const Circulation = ({ form }: { form: UseFormReturn<NewspaperFormValues> }) => {
  const circulation = form.watch('properties.circulationLocation');
  const { remove, append } = useFieldArray({
    name: 'properties.circulationLocation',
  });
  return (
    <div className="space-y-6">
      <Label>Circulation</Label>
      {circulation?.map((field, index) => (
        <Card key={index} className="border-none p-0 rounded-sm py-2">
          <CardContent className=" flex  items-center gap-x-4">
            <div className="w-full">
              <Location form={form} name={`properties.circulationLocation.${index}.location`} />
            </div>
            <FormField
              control={form.control}
              name={`properties.circulationLocation.${index}.count`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Count</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="input-13"
                        className="peer pe-12 ps-8 py-5 rounded-sm"
                        placeholder="0"
                        {...field}
                      />
                      <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                        <Calculator size={15} />
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    type="button"
                    aria-label="Add new item"
                    className="bg-[#ffebe6] hover:bg-[#ffebe6] w-28 h-12 mt-6"
                    onClick={() => remove(index)}
                  >
                    <Trash size={25} strokeWidth={2} aria-hidden="true" color="#fd381d" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1 text-xs">Remove Dimension</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>
      ))}
      <div
        className="bg-white border p-4 flex justify-center items-center rounded-sm border-[#1a1174] border-dashed cursor-pointer gap-x-2"
        onClick={() =>
          append({
            count: undefined,
            location: '',
          })
        }
      >
        <Plus className="text-[#1a1174] w-5 h-5" />
        <p className="text-[#1a1174] font-semibold"> Add New Circulation</p>
      </div>
    </div>
  );
};

export default Circulation;
