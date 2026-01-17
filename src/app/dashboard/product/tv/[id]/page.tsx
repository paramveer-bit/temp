import React from 'react';
import TVForm from '@/components/dashboard/product/tv/tv-form';
import { getProduct } from '@/hooks/use-server';

// Define the expected props type explicitly to match Next.js 15's async params
type PageProps = {
  params: Promise<{ id: string }>; // params is now a Promise in Next.js 15
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Use async/await to resolve the params Promise
const EditTVPage = async ({ params }: PageProps) => {
  const resolvedParams = await params; // Resolve the Promise to get { id: string }
  const data = await getProduct(resolvedParams.id);
  return <TVForm tv={data} />;
};

export default EditTVPage;
