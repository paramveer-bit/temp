'use client';
import React from 'react';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { OOHFormValues, oohSchema } from '@/utils/validation';
import Detail from '../common/detail';

import Carousel from '../common/carousel';

import Submit from '../common/submit';
import { useCreateProduct, useUpdateProduct } from '@/hooks/use-query';
import { getCookie } from 'cookies-next';
import Information from './information';

interface OHHFormProp {
  ooh: undefined | import('@/types/product').IProduct;
}

const OHHForm: React.FC<OHHFormProp> = ({ ooh }) => {
  const form = useForm<OOHFormValues>({
    resolver: zodResolver(oohSchema),
    defaultValues: {
      ...ooh,
      medias: ooh?.medias[0],
      properties: {
        ...ooh?.properties,
        carousel: ooh ? ooh.properties.carousel : [],
        lighting: ooh ? ooh.properties.lighting : [],
        adType: ooh ? ooh.properties.adType : [],
      },
    },
    mode: 'onChange',
  });

  const { mutate: create, isPending: isCreating } = useCreateProduct();
  const { mutate: update, isPending: isUpdating } = useUpdateProduct(ooh?._id as string);

  const onSubmit = (data: OOHFormValues) => {
    if (ooh) {
      update({
        ...data,
        medias: [data.medias],
        category: 'OOH',
        subCategory: 'OOH',
        // @ts-ignore
        status: ooh.status,
      });
    } else {
      create({
        ...data,
        medias: [data.medias],
        category: 'OOH',
        subCategory: 'OOH',
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
        <Submit isCreating={isCreating} isUpdating={isUpdating} id={ooh?._id} />
      </form>
    </Form>
  );
};

export default OHHForm;
