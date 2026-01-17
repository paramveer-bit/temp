import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { location } from '@/utils/data';

interface TLocationProp {
  form: any;
  name: string;
}

const Location: React.FC<TLocationProp> = ({ form, name }) => {
  return (
    <>
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="py-5">
                  <SelectValue placeholder="Select a Location" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[40vh]">
                {location.map((el) => (
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
    </>
  );
};

export default Location;
