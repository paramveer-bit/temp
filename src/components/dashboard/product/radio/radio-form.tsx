'use client';
import React from 'react';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RadioFormValues, radioSchema } from '@/utils/validation';
import Detail from '../common/detail';

import Carousel from '../common/carousel';

import Submit from '../common/submit';
import { useCreateProduct, useUpdateProduct } from '@/hooks/use-query';
import { getCookie } from 'cookies-next';
import Information from './information';

interface RadioFormProp {
  radio: undefined | import('@/types/product').IProduct;
}

const RadioForm: React.FC<RadioFormProp> = ({ radio }) => {
  const form = useForm<RadioFormValues>({
    resolver: zodResolver(radioSchema),
    defaultValues: {
      ...radio,
      medias: radio?.medias[0],
      properties: {
        ...radio?.properties,
        carousel: radio ? radio.properties.carousel : [],
        timeSlot: radio ? radio.properties.timeSlot : [],
        adUnit: radio ? radio.properties.adUnit : [],
        cast: radio ? radio.properties.cast : [],
      },
    },
    mode: 'onChange',
  });

  const { mutate: create, isPending: isCreating } = useCreateProduct();
  const { mutate: update, isPending: isUpdating } = useUpdateProduct(radio?._id as string);

  const onSubmit = (data: RadioFormValues) => {
    if (radio) {
      update({
        ...data,
        medias: [data.medias],
        category: 'Radio',
        subCategory: 'Radio',
        // @ts-ignore
        status: radio.status,
      });
    } else {
      create({
        ...data,
        medias: [data.medias],
        category: 'Radio',
        subCategory: 'Radio',
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
        <Submit isCreating={isCreating} isUpdating={isUpdating} id={radio?._id} />
      </form>
    </Form>
  );
};

export default RadioForm;
