import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multiselect';
import { oohAdType } from '@/utils/data';
import { OOHFormValues } from '@/utils/validation';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

const AdType = ({ form }: { form: UseFormReturn<OOHFormValues> }) => {
  return (
    <div className="space-y-2">
      <Label>Ad Type</Label>
      <MultipleSelector
        commandProps={{
          label: 'Select ad type',
        }}
        defaultOptions={oohAdType}
        value={form.watch('properties.adType').map((item) => ({ label: item, value: item }))}
        onChange={(value) => {
          form.setValue(
            'properties.adType',
            value.map((item) => item.value),
          );
        }}
        placeholder="Select ad type"
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </div>
  );
};

export default AdType;
