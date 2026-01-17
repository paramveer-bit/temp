export interface ICreateProduct {
  _id?: string;
  adId?: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  status: 'Active' | 'Inactive';
  medias: string[];
  properties: any;
  seller?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBrand {
  _id?: string;
  name: string;
  description: string;
  image: string;
  category: string;
  slug: string;
  brands: IBrand[];
  seo: {
    title: string;
    keyword: string;
    description: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id?: string;
  category: string;
  subCategory: string;
  medias: string[];
  properties: any;
  title: string;
  description: string;
  hidden: boolean;
  owner: string;
  inStock: string;
  status: string;
  seo: {
    meta_title: string;
    robot_tag: string;
    meta_keyword: string;
    meta_description: string;
    meta_image_url: string;
    slug: string;
    _id: string;
  };
  createdAt: Date;
  updatedAt: Date;
  stats?: {
    price: number;
    sold: number;
    sales: number;
    change: number;
    orderCount: number;
  };
}
