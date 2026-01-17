import { useBrand } from '@/hooks/use-query';
import { InfluencerFormValues } from '@/utils/validation';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const Brand = ({ form }: { form: UseFormReturn<InfluencerFormValues> }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const brands = form.watch('properties.brand');
  const { data, isPending } = useBrand();
  if (isPending) return <SelectLoader />;

  return (
    <div className="space-y-2">
      <Label htmlFor="select-45">Brand worked with</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="select-45"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20 py-5"
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-2">
                <Avatar className="rounded-md w-14 h-14">
                  <AvatarImage
                    src={data?.find((item) => item.name === value)?.image}
                    className="object-contain "
                  />
                </Avatar>
                <span className="truncate">{data?.find((item) => item.name === value)?.name}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">Select Brand</span>
            )}
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-(--radix-popper-anchor-width) border-input p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search services..." />
            <CommandList>
              <CommandEmpty>No service found.</CommandEmpty>
              <CommandGroup>
                {data?.map((item) => (
                  <CommandItem
                    key={item.name}
                    value={item.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      if (brands?.some((el) => el.brandName === item.name)) {
                        form.setValue(
                          'properties.brand',
                          brands.filter((el) => el.brandName !== item.name),
                        );
                      } else {
                        form.setValue('properties.brand', [
                          ...(brands ?? []),
                          { brandImage: item.image, brandName: item.name },
                        ]);
                      }
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between cursor-pointer ${brands?.some((el) => el.brandName === item.name) && 'bg-[#f5f5f5]'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="rounded-md w-16 h-16">
                        <AvatarImage src={item.image} className="object-contain " />
                      </Avatar>
                      {item.name}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {brands?.map((el) => (
          <div
            key={el.brandName}
            className="bg-white shadow-xs rounded-sm flex flex-col justify-center items-center p-2 space-y-2"
          >
            <Image src={el.brandImage} width={100} height={100} unoptimized alt="Brand" />
            <Badge variant="outline">{el.brandName}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;

const SelectLoader = () => {
  return (
    <div className="p-3 round-sm flex justify-between cursor-not-allowed">
      <p className="text-muted">Loading</p>
      <RotateCcw className="text-muted animate-spin" />
    </div>
  );
};
