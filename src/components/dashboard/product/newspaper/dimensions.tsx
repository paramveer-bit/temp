'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { dimensions } from '@/utils/data';
import { NewspaperFormValues } from '@/utils/validation';
import { Plus, Trash } from 'lucide-react';
import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import Carousel from '../common/carousel';

const Dimensions = ({ form }: { form: UseFormReturn<NewspaperFormValues> }) => {
  const dimension = form.watch('properties.adDimenions');
  const { remove, append } = useFieldArray({
    name: 'properties.adDimenions',
  });
  return (
    <div className="space-y-6">
      <Label>Dimension</Label>
      {dimension?.map((field, index) => (
        <Card key={index} className="border-none p-0 rounded-sm py-2">
          <CardContent className="space-y-4">
            <div className=" flex  items-center gap-x-4">
              <FormField
                name={`properties.adDimenions.${index}.title`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select dimension </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-5 ">
                          <SelectValue placeholder="Select dimension" className="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[40vh]">
                        {dimensions.map((el: any) => (
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
                control={form.control}
                name={`properties.adDimenions.${index}.price`}
                render={({ field }) => (
                  <FormItem className="w-full">
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
            </div>
            <div className="space-y-4">
              <FormLabel className="">Dimension Images</FormLabel>
              <Carousel form={form} name={`properties.adDimenions.${index}.image`} />
            </div>
          </CardContent>
        </Card>
      ))}
      <div
        className="bg-white border p-4 flex justify-center items-center rounded-sm border-[#1a1174] border-dashed cursor-pointer gap-x-2"
        onClick={() =>
          append({
            title: '',
            price: '',
            image: [],
          })
        }
      >
        <Plus className="text-[#1a1174] w-5 h-5" />
        <p className="text-[#1a1174] font-semibold"> Add New Dimension</p>
      </div>
    </div>
  );
};

export default Dimensions;
