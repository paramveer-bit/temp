import { Checkbox } from '@/components/ui/checkbox';
import { InfluencerFormValues } from '@/utils/validation';
import Image from 'next/image';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const Platform = ({ form }: { form: UseFormReturn<InfluencerFormValues> }) => {
  const platform = form.watch('properties.platform');
  return (
    <div className="space-y-8 max-w-4xl w-full">
      <FormLabel className="text-xl font-semibold">Social Media Properties</FormLabel>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex cursor-pointer flex-col gap-4 rounded-lg border border-input p-4 shadow-xs shadow-black/5 has-data-[state=checked]:border-ring"
          >
            <div className="flex justify-between gap-2">
              <Checkbox
                id={item.id}
                value={item.value}
                className="order-1 after:absolute after:inset-0"
                onCheckedChange={(checked) => {
                  if (checked) {
                    form.setValue('properties.platform', [...platform, item.value]);
                  } else {
                    form.setValue(
                      'properties.platform',
                      platform.filter((el) => el !== item.value),
                    );
                  }
                }}
                checked={platform.includes(item.value)}
              />
              <Image src={item.icon} width={16} height={16} alt="Platform" unoptimized />
            </div>
            <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
          </div>
        ))}
      </div>
      <div className="w-full h-[10px]" />
      {platform.includes('Instagram') && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Handel</FormLabel>
            <div className="p-2 flex gap-4 items-center border rounded-sm">
              <Image src="/icon/insta.png" width={16} height={16} alt="Platform" unoptimized />
              Instagram
            </div>
          </div>
          <FormField
            name="properties.instagramUsername"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="@username" {...field} className="rounded-sm py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="properties.instagramReelCommercial"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reel</FormLabel>
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
          <FormField
            name="properties.instagramStoryCommercial"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Story</FormLabel>
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
          <FormField
            name="properties.instagramImagePostCommercial"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Post</FormLabel>
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
        </div>
      )}
      {platform.includes('Youtube') && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Handel</FormLabel>
            <div className="p-2 flex gap-4 items-center border rounded-sm">
              <Image src="/icon/youtube.png" width={16} height={16} alt="Platform" unoptimized />
              Youtube
            </div>
          </div>
          <FormField
            name="properties.youtubeUsername"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="@username" {...field} className="rounded-sm py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="properties.youtubeShortsCommercial"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short</FormLabel>
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
          <FormField
            name="properties.youtubeVideoCommercial"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
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
        </div>
      )}

      {platform.includes('Twitter') && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Handel</FormLabel>
            <div className="p-2 flex gap-4 items-center border rounded-sm">
              <Image src="/icon/x.png" width={16} height={16} alt="Platform" unoptimized />X or
              Twitter
            </div>
          </div>
          <FormField
            name="properties.twitterUsername"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="@username" {...field} className="rounded-sm py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="properties.twitterTweetsCommercial"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tweet</FormLabel>
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
        </div>
      )}

      {platform.includes('Facebook') && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <FormLabel>Handel</FormLabel>
            <div className="p-2 flex gap-4 items-center border rounded-sm">
              <Image src="/icon/youtube.png" width={16} height={16} alt="Platform" unoptimized />
              Facebook
            </div>
          </div>
          <FormField
            name="properties.facebookUsername"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="@username" {...field} className="rounded-sm py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="properties.facebookPostCommercial"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post</FormLabel>
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
        </div>
      )}
    </div>
  );
};

export default Platform;

const items = [
  {
    id: 'checkbox-16-c1',
    value: 'Instagram',
    label: 'Instagram',
    icon: '/icon/insta.png',
    defaultChecked: true,
  },
  {
    id: 'checkbox-16-c2',
    value: 'Youtube',
    label: 'Youtube',
    icon: '/icon/youtube.png',
  },
  {
    id: 'checkbox-16-c3',
    value: 'Twitter',
    label: 'X or Twitter',
    icon: '/icon/x.png',
  },
  {
    id: 'checkbox-16-c4',
    value: 'Facebook',
    label: 'Facebook',
    icon: '/icon/x.png',
  },
];
