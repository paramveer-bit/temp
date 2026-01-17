import { useCast } from '@/hooks/use-query';
import React from 'react';

import { Label } from '@/components/ui/label';
import { ChevronDown, RotateCcw, Trash } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CastFormValues } from '@/utils/validation';

const Cast = ({ form }: { form: any }) => {
  const [search, setSearch] = React.useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const casts: CastFormValues = form.watch('properties.cast');
  const { data, isPending } = useCast(search);

  return (
    <div className="space-y-2">
      <Label htmlFor="select-45">Cast</Label>
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
                <span className="truncate">
                  {data?.find((item) => item.title === value)?.title}
                </span>
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
            <input
              className="flex h-10 w-full rounded-md bg-transparent  text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 px-4 py-4"
              type="text"
              placeholder="Search for cast"
              value={search}
              onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                setSearch(e.target.value)
              }
            />
            <CommandList className="scrollbar scrollbar-w-0">
              {!isPending && <CommandEmpty>No casts found.</CommandEmpty>}

              {isPending && (
                <CommandEmpty className="flex justify-center">
                  <RotateCcw className="animate-spin" />
                </CommandEmpty>
              )}
              <CommandGroup>
                {data?.map((item) => (
                  <CommandItem
                    key={item.title}
                    value={item.title}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      if (casts.some((el) => el.title === item.title)) {
                        form.setValue(
                          'properties.cast',
                          casts.filter((el) => el.title !== item.title),
                        );
                      } else {
                        form.setValue('properties.cast', [
                          ...(casts ?? []),
                          {
                            id: item._id,
                            title: item.title,
                            image: item.medias[0],
                            description: item.description,
                          },
                        ]);
                      }
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between cursor-pointer ${casts?.some((el) => el.title === item.title) && 'bg-[#f5f5f5]'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="rounded-md w-16 h-16 bg-gray-100">
                        <AvatarImage src={item.medias[0]} className="object-contain " />
                      </Avatar>
                      {item.title}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {casts?.map((el) => (
          <div
            key={el.title}
            className="bg-white shadow-xs rounded-sm flex flex-col justify-center items-center p-2 space-y-2"
          >
            <Image
              src={el.image}
              width={100}
              height={100}
              unoptimized
              className="bg-gray-100 rounded-sm p-2"
              alt="Brand"
            />
            <Badge variant="outline">{el.title}</Badge>
            <Button
              size="icon"
              className="bg-[#ffebe6] hover:bg-[#ffebe6]"
              disabled={isPending}
              onClick={() =>
                form.setValue(
                  'properties.cast',
                  casts.filter((item) => item.title !== el.title),
                )
              }
            >
              <Trash size={16} strokeWidth={2} aria-hidden="true" color="#fd381d" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
