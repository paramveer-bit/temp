import { apiUrl } from '@/utils/urls';
import { cookies } from 'next/headers';
import type { IUserDetails } from '@/types/types';
import type { IProduct } from '@/types/product';

export const getSeller = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/seller`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (res.status === 201 && data.seller) {
      const sellerData: any = {
        ...data.seller,
        bio: data.seller.bio || null,
        avatar: data.seller.profile_pic || data.seller.avatar || null,
      };

      return sellerData as IUserDetails;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const getInfluencers = async () => {
  const cookieStore = await cookies();
  const res = await fetch(
    `${apiUrl}/ad/filter?category=Digital&seller=${cookieStore.get('seller')?.value}&subCategory=Influencers`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get('token')?.value}`,
      },
      next: {
        tags: ['influencers'],
      },
      cache: 'no-store',
    },
  );
  const data = await res.json();
  if (res.status === 200) {
    return data.data as IProduct[];
  }

  return [];
};
export const getOOH = async () => {
  const cookieStore = await cookies();
  const res = await fetch(
    `${apiUrl}/ad/ooh/filter?category=OOH&seller=${cookieStore.get('seller')?.value}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get('token')?.value}`,
      },
      next: {
        tags: ['ooh'],
      },
      cache: 'no-store',
    },
  );
  const data = await res.json();
  if (res.status === 200) {
    return data.data as IProduct[];
  }

  return [];
};
export const getNewspaper = async () => {
  const cookieStore = await cookies();
  const res = await fetch(
    `${apiUrl}/ad/news-paper/filter?category=Newspaper&seller=${cookieStore.get('seller')?.value}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get('token')?.value}`,
      },
      next: {
        tags: ['newspaper'],
      },
      cache: 'no-store',
    },
  );
  const data = await res.json();
  if (res.status === 200) {
    return data.data as IProduct[];
  }

  return [];
};
export const getMagazine = async () => {
  const cookieStore = await cookies();
  const res = await fetch(
    `${apiUrl}/ad/magazine/filter?category=Magazine&seller=${cookieStore.get('seller')?.value}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get('token')?.value}`,
      },
      next: {
        tags: ['magazine'],
      },
      cache: 'no-store',
    },
  );
  const data = await res.json();
  if (res.status === 200) {
    return data.data as IProduct[];
  }

  return [];
};
export const getRadio = async () => {
  const cookieStore = await cookies();
  const res = await fetch(
    `${apiUrl}/ad/radio/filter?category=Radio&seller=${cookieStore.get('seller')?.value}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get('token')?.value}`,
      },
      next: {
        tags: ['radio'],
      },
      cache: 'no-store',
    },
  );
  const data = await res.json();
  if (res.status === 200) {
    return data.data as IProduct[];
  }

  return [];
};
export const getTv = async () => {
  const cookieStore = await cookies();
  const res = await fetch(
    `${apiUrl}/ad/tv/filter?category=TV&seller=${cookieStore.get('seller')?.value}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get('token')?.value}`,
      },
      next: {
        tags: ['tv'],
      },
      cache: 'no-store',
    },
  );
  const data = await res.json();
  if (res.status === 200) {
    return data.data as IProduct[];
  }

  return [];
};
export const getAllProducts = async () => {
  try {
    const cookieStore = await cookies();
    const sellerId = cookieStore.get('seller')?.value;
    const token = cookieStore.get('token')?.value;

    if (!sellerId || !token) {
      console.warn('getAllProducts: Missing sellerId or token');
      return [];
    }

    const url = `${apiUrl}/ad/seller/ads?sellerId=${sellerId}`;
    // console.log('getAllProducts: Fetching from:', url);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['all-products'],
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('getAllProducts: Response not OK', res.status, res.statusText);
      const errorText = await res.text();
      console.error('getAllProducts: Error response:', errorText);
      return [];
    }

    const data = await res.json();
    // console.log('getAllProducts: Response data:', {
    //   success: data.success,
    //   count: data.count,
    //   dataLength: data.data?.length,
    // });

    if (data.success && data.data) {
      return data.data as IProduct[];
    }

    console.warn('getAllProducts: Invalid response format', data);
    return [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

export const getProduct = async (id: string) => {
  const cookieStore = await cookies();
  const res = await fetch(`${apiUrl}/ad/details/${id}`, {
    headers: {
      Authorization: `Bearer ${cookieStore.get('token')?.value}`,
    },
    next: {
      tags: ['product', id],
    },
    cache: 'no-store',
  });
  const data = await res.json();
  if (res.status === 200) {
    return data.ad as IProduct;
  }

  return undefined;
};
