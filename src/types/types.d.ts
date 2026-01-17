import type { IProduct } from './product';

export interface IUserDetails {
  _id?: string;
  sub_category: string[];
  email: string;
  email_verify_code?: string;
  mobile_number: string;
  name: string;
  business_name: string;
  category: string;
  address: string;
  pin_code?: string;
  state: string;
  city: string;
  account_number: string;
  isVerified?: boolean;
  ifsc_code: string;
  gst_number?: string;
  bio?: string;
  avatar?: string;
}

export interface IOrderPriceItem {
  price_type: string;
  amount: number;
  quantity: number;
}

export interface IOrderAddress {
  state?: string;
  pincode?: number;
  flat_No?: string;
  country?: string;
  city?: string;
  area?: string;
  email?: string;
  name?: string;
  phone_number?: string;
}

export interface IOrderItem {
  adId: string | IProduct;
  price: IOrderPriceItem[];
}

export interface IOrderNote {
  note: string;
  addedBy: string;
  noteByModel: 'User' | 'Seller' | 'Admin';
  createdAt: Date | string;
}

export interface IOrder {
  _id: string;
  userId: string | IUserDetails;
  sellerId: string;
  sellerResponse?: 'Pending' | 'Accepted' | 'Rejected';
  sellerResponseDate?: Date | string | null;
  rejectionReason?: string;
  orderNotes?: IOrderNote[];
  trackingNumber?: string;
  deliveryInstructions?: string;
  orderPriority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  estimatedDelivery?: Date | string | null;
  actualDelivery?: Date | string | null;
  orderShortId: string;
  items: IOrderItem;
  brief?: Record<string, any>;
  status:
    | 'Approval'
    | 'Approved'
    | 'Payment'
    | 'Processing'
    | 'Working'
    | 'Delivered'
    | 'Ordered'
    | 'Pending'
    | 'Failed';
  status_info?: string;
  total_amount: number;
  address_details: IOrderAddress;
  paymentStatus?: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paymentMethod?: {
    cardType?: string;
    lastFourDigits?: string;
    expiryDate?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetails extends IOrder {
  customerInfo: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
    memberSince: string | Date;
  };
  orderSummary: {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  };
  billingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
  };
  orderItems: Array<{
    id: string;
    title: string;
    description: string;
    image: string | null;
    category: string;
    subCategory: string;
    price: IOrderPriceItem[];
    quantity: number;
  }>;
  sellerId?: {
    _id?: string;
    name?: string;
    email?: string;
    phone_number?: string;
  };
}

export interface IOrderFilterParams {
  search?: string;
  status?: string;
  sellerResponse?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IOrderPagination {
  currentPage: number;
  totalPages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IOrderFilterResponse {
  success: boolean;
  orders: IOrder[];
  pagination: IOrderPagination;
}

export interface IOrderDetailsResponse {
  success: boolean;
  message: string;
  order: IOrderDetails;
}

export interface INotification {
  _id: string;
  userId?: string;
  sellerId?: string;
  orderId?: {
    _id: string;
    orderShortId: string;
    total_amount: number;
  };
  title: string;
  message: string;
  type:
    | 'order_created'
    | 'order_accepted'
    | 'order_rejected'
    | 'order_updated'
    | 'review_created'
    | 'review_approved'
    | 'review_rejected'
    | 'general';
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface INotificationPagination {
  currentPage: number;
  totalPages: number;
  totalNotifications: number;
  unreadCount: number;
}

export interface INotificationResponse {
  success: boolean;
  message: string;
  notifications: INotification[];
  pagination: INotificationPagination;
}

export interface IReview {
  _id: string;
  userId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
      };
  productId:
    | string
    | {
        _id: string;
        title: string;
        images?: string[];
      };
  rating: number;
  comment: string;
  status: 'pending' | 'published' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface IReviewStats {
  success: boolean;
  stats: Array<{
    _id: number;
    count: number;
  }>;
  totalReviews: number;
  avgRating: number;
}

export interface IReviewFilterParams {
  status?: 'pending' | 'published' | 'rejected';
  page?: number;
  limit?: number;
}

export interface IReviewResponse {
  success: boolean;
  reviews: IReview[];
  totalPages: number;
  currentPage: number;
}
