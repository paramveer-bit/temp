import { Nunito_Sans as nunitoSans } from 'next/font/google';

export const nunito = nunitoSans({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
