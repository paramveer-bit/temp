import { uploadMedia } from '@/hooks/use-query';
import { ImagePlusIcon, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Carousel = ({ form, name }: { form: any; name: string }) => {
  const image: string[] = form.watch(name);
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
      form.setValue(name, [...image, res[0].url]);
    }
    setLoader(false);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-5 w-full">
      {image?.map((el, i) => (
        <div
          className="flex  flex-col space-y-4 items-center justify-center w-full h-[150px] cursor-pointer bg-white shadow-md relative border "
          onClick={() =>
            form.setValue(
              name,
              image.filter((item, index) => index !== i),
            )
          }
          key={i}
        >
          <Image src={el} fill alt="Carousel" unoptimized className="object-contain" />
        </div>
      ))}
      <div className="flex  flex-col space-y-4 items-center justify-center w-full h-[150px]  bg-white shadow-md relative border border-dashed cursor-pointer">
        {loader ? (
          <RotateCcw className="w-8 h-8 animate-spin" color="#1a1174" />
        ) : (
          <>
            <ImagePlusIcon className="w-8 h-8 cursor-pointer" color="#1a1174" />
            <p className="text-[#1a1174]">Browse image</p>
            <input
              type="file"
              className="opacity-0 absolute inset-0 cursor-pointer"
              accept="image/png, image/jpeg,image/jpg,image/ai,image/eps,image/psd,image/tif,image/tiff,image/pdf"
              onChange={handelMedia}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
