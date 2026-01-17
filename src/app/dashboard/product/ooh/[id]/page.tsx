import React from 'react';
import OHHForm from '@/components/dashboard/product/ooh/ooh-form';
import { getProduct } from '@/hooks/use-server';

// Define the expected props type explicitly
type PageProps = {
  params: Promise<{ id: string }>; // Match the expected Promise type
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Use async/await to resolve the params Promise
const EditOOHPage = async ({ params }: PageProps) => {
  const resolvedParams = await params; // Resolve the Promise to get { id: string }
  const data = await getProduct(resolvedParams.id);
  return <OHHForm ooh={data} />;
};

export default EditOOHPage;
