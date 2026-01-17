import Image from 'next/image';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Brands = () => {
  return (
    <div className="w-full bg-white py-10 md:py-16">
      <Tabs defaultValue="Brands" className="max-w-360 mx-auto w-full mt-20">
        {/* SCROLLABLE TABS — MOBILE FRIENDLY */}
        <div className="overflow-x-auto no-scrollbar">
          <TabsList
            className="
            flex min-w-max 
            h-auto rounded-none border-b border-gray-300 bg-transparent p-0
            space-x-6
          "
          >
            {brands.map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.name}
                className="
                relative py-2 rounded-none whitespace-nowrap
                lg:text-lg text-gray-600
                data-[state=active]:text-[#333333] data-[state=active]:bg-transparent
                data-[state=active]:shadow-none
                data-[state=active]:after:bg-[#f8794b]
                after:absolute after:inset-x-0 after:bottom-0 after:h-0.5
                transition-all duration-300 ease-in-out
                hover:text-[#f8794b]
              "
              >
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* TAB CONTENT */}
        {brands.map((item) => (
          <TabsContent key={item.name} value={item.name}>
            <div className="relative flex flex-col mt-10">
              {/* Background layers */}
              <div className="w-full h-[100px] -z-10" />
              <div className="w-full h-[150px] lg:h-[600px] bg-white -z-10" />

              {/* Main card */}
              <div className="absolute inset-0 z-10 p-2">
                <div className="relative max-w-360 mx-auto w-full h-full md:h-[300px] lg:h-[500px] xl:h-[600px]">
                  <Image
                    src={item.img}
                    fill
                    alt={item.name}
                    unoptimized
                    className="object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
                  />

                  <div className="absolute inset-0 p-3 sm:p-4 md:p-6 xl:p-20 flex items-center">
                    <div className="bg-white rounded-md p-4 sm:p-6 xl:p-8 max-w-lg space-y-4 md:space-y-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
                      <h3 className="font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl transition-colors duration-300">
                        {item.title}
                        <span className="text-[#E91724]"> {item.red}</span>
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-[#696969]">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Brands;

/* DATA */
const brands = [
  {
    name: 'Brands',
    img: '/home/brand.png',
    title: 'Reach More',
    red: 'Brands',
    desc: 'Connect with top advertisers across India and maximize your ad space visibility.',
  },
  {
    name: 'Management',
    img: '/home/brand2.jpg',
    title: 'Easy',
    red: 'Control',
    desc: 'Easily track, manage, and update your ad listings in one place. Our platform simplifies inventory control, helping you stay organized and focus on sales.',
  },
  {
    name: 'Fast Payouts',
    img: '/home/brand3.png',
    title: 'Quick',
    red: 'Payments',
    desc: 'Get your earnings faster with Mark My Ad’s quick and reliable payout system, ensuring you have the cash flow you need to keep your business growing.',
  },
  {
    name: '24x7 Support',
    img: '/home/brand4.jpg',
    title: 'Round-the-Clock',
    red: 'Help',
    desc: 'Our dedicated support team is available around the clock, providing expert assistance whenever you need it for a seamless selling experience.',
  },
];
