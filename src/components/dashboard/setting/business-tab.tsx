import React from 'react';

import { Building2, Info } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SellerFormValues } from '@/utils/validation';
import { Label } from '@radix-ui/react-label';
import MultipleSelector from '@/components/ui/multiselect';
import { subCategory } from '@/utils/data';

interface BusinessTabProps {
  form: UseFormReturn<SellerFormValues>;
  isEditing: boolean;
}

export function BusinessTab({ form, isEditing }: BusinessTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Business Information
        </CardTitle>
        <CardDescription>Your business details and category</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="business.business_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="business.category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="ml-1 h-3 w-3" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>You {"can't"} update your Category</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={true} />
                </FormControl>
                <FormDescription>
                  Current category: {field.value} - {form.watch('business.sub_category').join(', ')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label>Sub Category</Label>
            <MultipleSelector
              commandProps={{
                label: 'Select Sub Category',
              }}
              disabled={!isEditing}
              defaultOptions={subCategory}
              value={form
                .watch('business.sub_category')
                .map((item) => ({ label: item, value: item }))}
              onChange={(value) => {
                form.setValue(
                  'business.sub_category',
                  value.map((item) => item.value),
                );
              }}
              placeholder="Select Sub Category"
              emptyIndicator={<p className="text-center text-sm">No results found</p>}
            />
          </div>
          <FormField
            control={form.control}
            name="business.gst_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  GST Number
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="ml-1 h-3 w-3" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your business GST registration number</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter GST number" disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="business.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="business.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="business.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="business.pin_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter pincode" disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
