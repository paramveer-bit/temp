'use client';
import React from 'react';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MagazineFormValues, magazineSchema } from '@/utils/validation';
import Detail from '../common/detail';

import Carousel from '../common/carousel';

import Submit from '../common/submit';
import { useCreateProduct, useUpdateProduct } from '@/hooks/use-query';
import { getCookie } from 'cookies-next';
import Information from './information';

interface MagazineFormProp {
  magazine: undefined | import('@/types/product').IProduct;
}

const MagazineForm: React.FC<MagazineFormProp> = ({ magazine }) => {
  const form = useForm<MagazineFormValues>({
    resolver: zodResolver(magazineSchema),
    defaultValues: {
      ...magazine,
      medias: magazine?.medias[0],
      properties: {
        ...magazine?.properties,
        carousel: magazine ? magazine.properties.carousel : [],
        adDimenions: magazine ? magazine.properties.adDimenions : [],
        circulationLocation: magazine ? magazine.properties.circulationLocation : [],
      },
    },
    mode: 'onChange',
  });

  const { mutate: create, isPending: isCreating } = useCreateProduct();
  const { mutate: update, isPending: isUpdating } = useUpdateProduct(magazine?._id as string);

  const onSubmit = (data: MagazineFormValues) => {
    if (magazine) {
      update({
        ...data,
        medias: [data.medias],
        category: 'Magazine',
        subCategory: 'Magazine',
        // @ts-ignore
        status: magazine.status,
      });
    } else {
      create({
        ...data,
        medias: [data.medias],
        category: 'Magazine',
        subCategory: 'Magazine',
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
        <Submit isCreating={isCreating} isUpdating={isUpdating} id={magazine?._id} />
      </form>
    </Form>
  );
};

export default MagazineForm;
