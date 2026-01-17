import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multiselect';
import { durations } from '@/utils/data';
import { RadioFormValues } from '@/utils/validation';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

const Unit = ({ form }: { form: UseFormReturn<RadioFormValues> }) => {
  const adUnits = form.watch('properties.adUnit');
  return (
    <div className="space-y-5 lg:col-span-2">
      <div className="space-y-2">
        <Label>Ad Units</Label>
        <MultipleSelector
          commandProps={{
            label: 'Ad Units',
          }}
          defaultOptions={units}
          value={form.watch('properties.adUnit').map((item) => ({ label: item, value: item }))}
          onChange={(value) => {
            form.setValue(
              'properties.adUnit',
              value.map((item) => item.value),
            );
          }}
          placeholder="Select units"
          emptyIndicator={<p className="text-center text-sm">No results found</p>}
        />
      </div>
      {adUnitForm
        .filter((item) => adUnits.includes(item.label))
        .map((el) => (
          <Card key={el.label} className="rounded-md ">
            <CardHeader>
              <CardTitle>{el.label}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 lg:grid-cols-2 ">
              <FormField
                // @ts-ignore
                name={el.price}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        {/* @ts-ignore */}
                        <Input
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
              <div className="space-y-2">
                <Label>Durations</Label>
                <MultipleSelector
                  commandProps={{
                    label: 'Durations',
                  }}
                  className="py-[3px] rounded-sm"
                  defaultOptions={durations}
                  // @ts-ignore
                  value={form
                    // @ts-ignore
                    ?.watch(el.duration)
                    ?.map((item) => ({ label: item, value: item }))}
                  onChange={(value) => {
                    form.setValue(
                      // @ts-ignore
                      el.duration,
                      value?.map((item) => item.value),
                    );
                  }}
                  placeholder="Select Durations"
                  emptyIndicator={<p className="text-center text-sm">No results found</p>}
                />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Unit;

const units = [
  {
    label: 'Radio Jingle Ads',
    value: 'Radio Jingle Ads',
  },
  {
    label: 'RJ Mentions',
    value: 'RJ Mentions',
  },
  {
    label: 'Radio Interview',
    value: 'Radio Interview',
  },
  {
    label: 'Program Sponsorships',
    value: 'Program Sponsorships',
  },
];
const adUnitForm = [
  {
    label: 'Radio Jingle Ads',
    price: 'properties.priceRadioJingleAds',
    duration: 'properties.durationRadioJingleAds',
  },
  {
    label: 'RJ Mentions',
    price: 'properties.priceRJMentions',
    duration: 'properties.durationRJMentions',
  },
  {
    label: 'Radio Interview',
    price: 'properties.priceRadioInterview',
    duration: 'properties.durationRadioInterview',
  },
  {
    label: 'Program Sponsorships',
    price: 'properties.priceProgramSponsorships',
    duration: 'properties.durationProgramSponsorships',
  },
];
