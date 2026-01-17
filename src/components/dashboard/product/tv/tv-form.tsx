'use client';
import React from 'react';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TVFormValues, tvSchema } from '@/utils/validation';
import Detail from '../common/detail';

import Carousel from '../common/carousel';

import Submit from '../common/submit';
import { useCreateProduct, useUpdateProduct } from '@/hooks/use-query';
import { getCookie } from 'cookies-next';
import Information from './information';

interface TVFormProp {
  tv: undefined | import('@/types/product').IProduct;
}

const TVForm: React.FC<TVFormProp> = ({ tv }) => {
  const form = useForm<TVFormValues>({
    resolver: zodResolver(tvSchema),
    defaultValues: {
      ...tv,
      medias: tv?.medias[0],
      properties: {
        ...tv?.properties,
        carousel: tv ? tv.properties.carousel : [],
        timeSlot: tv ? tv.properties.timeSlot : [],
        adUnit: tv ? tv.properties.adUnit : [],
        cast: tv ? tv.properties.cast : [],
      },
    },
    mode: 'onChange',
  });

  const { mutate: create, isPending: isCreating } = useCreateProduct();
  const { mutate: update, isPending: isUpdating } = useUpdateProduct(tv?._id as string);

  const onSubmit = (data: TVFormValues) => {
    if (tv) {
      update({
        ...data,
        medias: [data.medias],
        category: 'TV',
        subCategory: 'TV',
        // @ts-ignore
        status: tv.status,
      });
    } else {
      create({
        ...data,
        medias: [data.medias],
        category: 'TV',
        subCategory: 'TV',
        status: 'Inactive',
        seller: getCookie('seller') ?? '',
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <Detail form={form} />
        <Information form={form} />
        <div className="space-y-4">
          <FormLabel className="text-xl font-semibold">Media</FormLabel>
          <Carousel form={form} name="properties.carousel" />
        </div>
        <Submit isCreating={isCreating} isUpdating={isUpdating} id={tv?._id} />
      </form>
    </Form>
  );
};

export default TVForm;
