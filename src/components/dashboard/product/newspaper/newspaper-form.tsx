'use client';
import React from 'react';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NewspaperFormValues, newspaperSchema } from '@/utils/validation';
import Detail from '../common/detail';

import Carousel from '../common/carousel';

import Submit from '../common/submit';
import { useCreateProduct, useUpdateProduct } from '@/hooks/use-query';
import { getCookie } from 'cookies-next';
import Information from './information';

interface NewspaperFormProp {
  newspaper: undefined | import('@/types/product').IProduct;
}

const NewspaperForm: React.FC<NewspaperFormProp> = ({ newspaper }) => {
  const form = useForm<NewspaperFormValues>({
    resolver: zodResolver(newspaperSchema),
    defaultValues: {
      ...newspaper,
      medias: newspaper?.medias[0],
      properties: {
        ...newspaper?.properties,
        carousel: newspaper ? newspaper.properties.carousel : [],
        adDimenions: newspaper ? newspaper.properties.adDimenions : [],
        circulationLocation: newspaper ? newspaper.properties.circulationLocation : [],
      },
    },
    mode: 'onChange',
  });

  const { mutate: create, isPending: isCreating } = useCreateProduct();
  const { mutate: update, isPending: isUpdating } = useUpdateProduct(newspaper?._id as string);

  const onSubmit = (data: NewspaperFormValues) => {
    if (newspaper) {
      update({
        ...data,
        medias: [data.medias],
        category: 'Newspaper',
        subCategory: 'Newspaper',
        // @ts-ignore
        status: newspaper.status,
      });
    } else {
      create({
        ...data,
        medias: [data.medias],
        category: 'Newspaper',
        subCategory: 'Newspaper',
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
        <Submit isCreating={isCreating} isUpdating={isUpdating} id={newspaper?._id} />
      </form>
    </Form>
  );
};

export default NewspaperForm;
