import React from 'react';
import Footer from '@/components/footer/footer';
import Brands from '@/components/home/brands';
import Faq from '@/components/home/faq';
import Hero from '@/components/home/hero';
import HeroCurve from '@/components/home/HeroCurve';
import JoinUs from '@/components/home/join-us';
import Seller from '@/components/home/seller';
import Subscribe from '@/components/home/subscribe';
import Visualize from '@/components/home/visualize';
import Why from '@/components/home/why';
import World from '@/components/home/world';
import Navbar from '@/components/navbar/navbar';
import type { Metadata } from 'next';
import Article from '@/components/home/article';

export const metadata: Metadata = {
  title: 'Start Selling Online: How to Sell Products Online as a Seller | Mark My Ad',
  description:
    'Start selling products online and grow your business with our guide. Learn how to sell online effectively and reach millions of customers today!',
  openGraph: {
    title: 'Start Selling Online: How to Sell Products Online as a Seller | Mark My Ad',
    description:
      'Start selling products online and grow your business with our guide. Learn how to sell online effectively and reach millions of customers today!',
    url: 'https://markmyad.com',
    siteName: 'MarkMyAd',
    locale: 'en_US',
    images: '/category/ooh_s.png',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      {/* <HeroCurve /> */}
      <Seller />
      <Why />
      <Brands />
      <Visualize />
      <World />
      <JoinUs />
      <Faq />
      <Article />
      <Subscribe />
      <Footer />
    </>
  );
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://seller.markmyad.com/',
  },
  headline: 'Start Selling Online: How to Sell Products Online as a Seller | Mark My Ad',
  image: 'https://seller.markmyad.com/_next/image?url=%2Fcategory%2Fooh_s.png&w=1920&q=75',
  author: {
    '@type': 'Organization',
    name: 'Mark My Ad',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Mark My Ad',
  },
};
