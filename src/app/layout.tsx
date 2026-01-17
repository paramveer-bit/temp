import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';
import { nunito } from '@/utils/fonts';
import TanStackProvider from '@/provider/tanstack';
import { AuthProvider } from '@/provider/AuthContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://seller.markmyad.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  title: 'Seller | MarkMyAd',
  description:
    'If you are looking to hire the best media buying agency in india then Mark My Ad is at your service.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.className}>
        {' '}
        <AuthProvider>
          <TanStackProvider>
            {children}
            <Toaster position="top-center" />
          </TanStackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
