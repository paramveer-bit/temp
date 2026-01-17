'use client';
import React from 'react';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InfluencerFormValues, influencerSchema } from '@/utils/validation';
import Detail from '../common/detail';
import Information from './information';
import Carousel from '../common/carousel';
import Platform from './platform';
import Submit from '../common/submit';
import { useCreateProduct, useUpdateProduct } from '@/hooks/use-query';
import { getCookie } from 'cookies-next';

interface InfluencerFormProp {
  influencer: undefined | import('@/types/product').IProduct;
}

const InfluencerForm: React.FC<InfluencerFormProp> = ({ influencer }) => {
  const form = useForm<InfluencerFormValues>({
    resolver: zodResolver(influencerSchema),
    defaultValues: {
      ...influencer,
      medias: influencer?.medias[0],
      properties: {
        ...influencer?.properties,
        platform: influencer ? influencer.properties.platform : ['Instagram'],
        carousel: influencer ? influencer.properties.carousel : [],
        brand: influencer ? influencer.properties.brand : [],
      },
    },
    mode: 'onChange',
  });

  const { mutate: create, isPending: isCreating } = useCreateProduct();
  const { mutate: update, isPending: isUpdating } = useUpdateProduct(influencer?._id as string);

  const onSubmit = (data: InfluencerFormValues) => {
    if (influencer) {
      update({
        ...data,
        medias: [data.medias],
        category: 'Digital',
        subCategory: 'Influencers',
        // @ts-ignore
        status: influencer.status,
      });
    } else {
      create({
        ...data,
        medias: [data.medias],
        category: 'Digital',
        subCategory: 'Influencers',
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
        <Platform form={form} />
        <Submit isCreating={isCreating} isUpdating={isUpdating} id={influencer?._id} />
      </form>
    </Form>
  );
};

export default InfluencerForm;
