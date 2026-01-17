import { getCookie } from 'cookies-next';
export const redirect = (category: string) => {
  switch (category) {
    case 'Influencers':
      return '/dashboard/product/influencer';
    case 'OOH':
      return '/dashboard/product/ooh';
    case 'Newspaper':
      return '/dashboard/product/newspaper';
    case 'Magazine':
      return '/dashboard/product/magazine';
    case 'Radio':
      return '/dashboard/product/radio';
    case 'TV':
      return '/dashboard/product/tv';

    default:
      return '/dashboard/product';
  }
};

export const isToken = () => {
  const token = getCookie('token');
  if (token) {
    return true;
  }

  return false;
};
