import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multiselect';
import { oohLighting } from '@/utils/data';
import { OOHFormValues } from '@/utils/validation';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

const Lighting = ({ form }: { form: UseFormReturn<OOHFormValues> }) => {
  return (
    <div className="space-y-2">
      <Label>Lighting</Label>
      <MultipleSelector
        commandProps={{
          label: 'Select Lighting',
        }}
        defaultOptions={oohLighting}
        value={form.watch('properties.lighting').map((item) => ({ label: item, value: item }))}
        onChange={(value) => {
          form.setValue(
            'properties.lighting',
            value.map((item) => item.value),
          );
        }}
        placeholder="Select Lighting"
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </div>
  );
};

export default Lighting;
