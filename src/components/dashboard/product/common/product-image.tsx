/* eslint-disable no-unused-vars */
import { uploadMedia } from '@/hooks/use-query';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ProductImage = ({ form, name }: { form: any; name: string }) => {
  const image = form.watch(name);
  const [loader, setLoader] = React.useState(false);
  const handelMedia = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoader(true);
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    event.target.value = '';
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadMedia(fd);
    if (res !== undefined) {
      form.setValue(name, res[0].url);
    }
    setLoader(false);
  };

  return (
    <div className="flex items-center justify-center w-20 h-20 cursor-pointer bg-white shadow-md relative">
      {!image ? (
        <ImagePlus className="w-5 h-5 " color="#1a1174" />
      ) : (
        <Image src={image} fill className="object-contain" alt="Product" unoptimized />
      )}
      <input
        type="file"
        className="opacity-0 absolute inset-0"
        accept="image/png, image/jpeg,image/jpg,image/ai,image/eps,image/psd,image/tif,image/tiff,image/pdf"
        onChange={handelMedia}
      />
    </div>
  );
};

export default ProductImage;
