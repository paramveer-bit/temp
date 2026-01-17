import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multiselect';
import { timeslots } from '@/utils/data';
import React from 'react';

const TimeSlot = ({ form }: { form: any }) => {
  return (
    <div className="space-y-2">
      <Label>Time Slot</Label>
      <MultipleSelector
        commandProps={{
          label: 'Select Time Slots',
        }}
        className="py-[3px] rounded-sm"
        defaultOptions={timeslots}
        value={form.watch('properties.timeSlot').map((item: any) => ({ label: item, value: item }))}
        onChange={(value) => {
          form.setValue(
            'properties.timeSlot',
            value.map((item) => item.value),
          );
        }}
        placeholder="Select Time Slots"
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </div>
  );
};

export default TimeSlot;
