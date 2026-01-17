/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import { apiUrl } from '@/utils/urls';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { getCookie, setCookie } from 'cookies-next';
import revalidateTag from '@/utils/server-tag';
import { redirect } from '@/utils/tools';
import { useRouter } from 'next/navigation';
import type {
  IUserDetails,
  IOrder,
  IOrderFilterParams,
  IOrderFilterResponse,
  IOrderDetailsResponse,
  INotificationResponse,
  INotification,
  IReview,
  IReviewFilterParams,
  IReviewResponse,
  IReviewStats,
} from '@/types/types';
import { axiosPublic } from '@/lib/axios';
import type { IProduct, IBrand, ICreateProduct } from '@/types/product';
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useAuth } from "@/provider/AuthContext"; // Import your Auth Context
interface SignUpData {
  name: string;
  email: string;
  number: string;
  password: string;
}

export const signUp = () => {
  const router = useRouter();

  return useMutation({
    // 1. THE ACTION: Call the API
    mutationFn: async (data: SignUpData) => {
      // No manual 'withCredentials' needed if you set it in axios.ts
      const res = await axiosPublic.post("/auth/signup", data);
      console.log("Signup response data:", res.data);
      return res.data.data;
    },

    // 2. SUCCESS: What to do if it works
    onSuccess: (data) => {
      toast.success("Account created successfully!", {
        description: "Please log in to continue.",
        style: { background: '#e7f6f1', color: '#16a87e' },
      });
      // Redirect to login page
      router.push(`/verify/${data.seller.id}`);
    },

    // 3. ERROR: What to do if it fails
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage, {
        description: "Please try again",
        style: { background: '#ffebe6', color: '#fd381d' },
      });
    },
  });
}

export const verify = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { otp: string, id: string }) => {
      const res = await axiosPublic.post(`/auth/verify-otp/${data.id}`, data);
      return res.data;
    },
    onSuccess: (data: any) => {
      toast.success("Email verified successfully!", {
        style: { background: '#e7f6f1', color: '#16a87e' },
      });
      router.push('/login');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to verify email";
      toast.error(errorMessage, {
        description: "Please try again",
        style: { background: '#ffebe6', color: '#fd381d' },
      });
    },
  });
}

export const useResendCode = () => {
  return useMutation({
    // 1. The API Call
    mutationFn: async (id: string) => {
      // We use axiosPublic directly. 
      // Note: The original code passed 'api' but used 'axiosPublic', so we stick to axiosPublic.
      const res = await axiosPublic.post(`/auth/resend-otp/${id}`);
      return res.data;
    },

    // 2. Success Logic
    onSuccess: (data) => {
      toast.success(data.message || "Code resent successfully", {
        position: 'top-center',
        style: {
          background: '#e6ffeb',
          color: '#38a169',
        },
      });
    },

    // 3. Error Logic
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "Failed to resend code";

      toast.error(errorMessage, {
        description: 'Please try after few min',
        position: 'top-center',
        style: {
          background: '#ffebe6',
          color: '#fd381d',
        },
      });
    },
  });
};

interface SignInData {
  emailOrPhone: string;
  password: string;
}

export const useSignIn = () => {
  const router = useRouter();
  // We need these to update the app state immediately after login
  const { setAccessToken, setUser } = useAuth();

  return useMutation({
    // 1. THE ACTION
    mutationFn: async (data: SignInData) => {
      // Map your frontend field names to what the backend expects
      const payload = {
        number: data.emailOrPhone, // Your backend expects 'number'
        password: data.password
      };

      // axiosPublic handles withCredentials: true automatically
      const res = await axios.post("http://localhost:4000/api/v1/seller/auth/signin", payload, { withCredentials: true });
      return res.data.data;
      // return null;
    },

    // 2. SUCCESS
    onSuccess: (response) => {
      // A. Update Global State (Critical for "Logged In" UI to show up instantly)
      // Adjust 'response.accessToken' based on your actual API structure (e.g. response.data.accessToken)
      console.log("SignIn successful, response:", response);
      if (response.accessToken) {
        setAccessToken(response.accessToken);
      }
      if (response.seller) {
        setUser(response.seller);
      }

      toast.success("Login Successful", {
        description: "Welcome back!",
        style: { background: '#e7f6f1', color: '#16a87e' },
      });

      // B. Redirect to Dashboard
      // router.push("/dashboard");
    },

    // 3. ERROR
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";

      toast.error(errorMessage, {
        description: 'Please check your credentials',
        position: 'top-center',
        style: {
          background: '#ffebe6',
          color: '#fd381d',
        },
      });
    },
  });
};

// ----------------------------------------------------------------------------------------
export const uploadMedia = async (formData: FormData, signal?: AbortSignal) => {
  const res = await axios({
    url: `${apiUrl}/minio/upload`,
    method: 'POST',
    data: formData,
    signal, // Support request cancellation
    timeout: 60000, // 60 seconds timeout for large files
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        // You can emit progress via callback or state update if needed
      }
    },
  });
  return res.data.results;
};

export const useEmail = (stepper: any) => {
  return useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await axios.post(`${apiUrl}/seller/signup`, data, { timeout: 10000 });
      return res.data;
    },
    onSuccess: () => {
      stepper.next();
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || error.message || 'Failed to send OTP';
      const desc =
        msg.includes('buffering timed out') || msg.includes('Database connection')
          ? 'Database connection issue. Please try again.'
          : 'Please try after few min';

      toast(msg, {
        description: desc,
        position: 'top-center',
        style: {
          background: '#ffebe6',
          color: '#fd381d',
        },
      });
    },
  });
};
// export const useSignIn = (stepper: any) => {
//   return useMutation({
//     mutationFn: async (data: { email: string }) => {
//       const res = await axios.post(`${apiUrl}/seller/login`, data);
//       return res.data;
//     },
//     onSuccess: (data: any) => {
//       stepper.next();
//     },
//     onError: (error) => {
//       toast(
//         // @ts-ignore
//         error.response.data.message
//           ? // @ts-ignore
//           error.response.data.message
//           : error.message,
//         {
//           description: 'Please try after few min',
//           position: 'top-center',
//           style: {
//             background: '#ffebe6',
//             color: '#fd381d',
//           },
//         },
//       );
//     },
//   });
// };
export const useEmailVerify = (stepper: any, onVerified?: (data: any) => void) => {
  return useMutation({
    mutationFn: async (data: { otp: string }) => {
      const res = await axios.post(`${apiUrl}/seller/verify`, data);
      return res.data;
    },
    onSuccess: (data: any) => {
      if (onVerified) {
        onVerified(data);
      }
      stepper.next();
    },
    onError: (error) => {
      toast(
        // @ts-ignore
        error.response.data.message
          ? // @ts-ignore
          error.response.data.message
          : error.message,
        {
          description: 'Please try after few min',
          position: 'top-center',
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};
export const useLoginEmailVerify = (stepper: any) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { otp: string }) => {
      const res = await axios.post(`${apiUrl}/seller/verify`, data);
      return res.data;
    },
    onSuccess: (data: any) => {
      setCookie('token', data.token, {
        maxAge: 96 * 60 * 60,
      });
      setCookie('seller', data.id, {
        maxAge: 96 * 60 * 60,
      });
      router.push(`/dashboard`);
    },
    onError: (error) => {
      toast(
        // @ts-ignore
        error.response.data.message
          ? // @ts-ignore
          error.response.data.message
          : error.message,
        {
          description: 'Please try after few min',
          position: 'top-center',
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};
export const useRegister = (id: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: IUserDetails) => {
      const { email, email_verify_code, ...result } = data;
      const res = await axios.put(`${apiUrl}/seller/update/${id}`, result);
      return res.data;
    },
    onSuccess: (data: any) => {
      setCookie('token', data.token, {
        maxAge: 96 * 60 * 60,
      });
      router.push('/dashboard');
    },
    onError: (error) => {
      toast(
        // @ts-ignore
        error.response.data.message
          ? // @ts-ignore
          error.response.data.message
          : error.message,
        {
          description: 'Please try after few min',
          position: 'top-center',
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};

export const useSeller = (): UseQueryResult<IUserDetails> => {
  return useQuery({
    queryKey: ['seller'],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/seller`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      const seller = res.data.seller;
      if (seller && seller.profile_pic !== undefined) {
        seller.avatar = seller.profile_pic;
      }
      return seller;
    },
    staleTime: Infinity,
  });
};

export const useSellerUpdate = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IUserDetails) => {
      const { email, email_verify_code, avatar, ...rest } = data;

      const payload: any = { ...rest };

      if (avatar !== undefined) {
        payload.profile_pic = avatar || '';
      }

      const res = await axios.put(`${apiUrl}/seller/update/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      return { response: res.data, originalData: data };
    },
    onSuccess: async (result) => {
      const { originalData } = result;

      queryClient.invalidateQueries({ queryKey: ['seller'] });

      const updatedSeller = {
        _id: id,
        ...originalData,
      };

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('seller-updated', {
            detail: updatedSeller,
          }),
        );
      }

      toast.success('Your info is successfully updated', {
        style: {
          background: '#e7f6f1',
          color: '#16a87e',
        },
      });

      try {
        await revalidateTag(['seller']);
      } catch (error) {
        // Silent fail for revalidation
      }

      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message || 'Failed to update seller';

      toast.error(errorMessage, {
        description: error.response?.status === 401 ? 'Please login again' : 'Please try again',
        position: 'top-center',
        style: {
          background: '#ffebe6',
          color: '#fd381d',
        },
      });
    },
  });
};
// ...............Product......................................
export const useCreateProduct = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: ICreateProduct) => {
      const res = await axios.post(`${apiUrl}/ad/add`, data);

      return res.data.ad as IProduct;
    },
    onSuccess: (data) => {
      toast.success('New product added', {
        style: {
          background: '#e7f6f1',
          color: '#16a87e',
        },
      });
      revalidateTag([data.subCategory.toLocaleLowerCase()]);
      router.push(redirect(data.subCategory));
    },
    onError: (error) => {
      toast.error(
        // @ts-ignore
        error.response.data.message
          ? // @ts-ignore
          error.response.data.message
          : error.message,
        {
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};
export const useUpdateProduct = (id: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: ICreateProduct) => {
      const res = await axios.patch(`${apiUrl}/ad/update/${id}`, data);
      return res.data.ad as IProduct;
    },
    onSuccess: (data) => {
      toast.success('Product updated', {
        style: {
          background: '#e7f6f1',
          color: '#16a87e',
        },
      });
      revalidateTag([data.subCategory.toLocaleLowerCase()]);
      revalidateTag(['product', id]);
      router.push(redirect(data.subCategory));
    },
    onError: (error) => {
      toast.error(
        // @ts-ignore
        error.response.data.message
          ? // @ts-ignore
          error.response.data.message
          : error.message,
        {
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};
export const useDeleteProduct = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`${apiUrl}/ad/delete/${id}`);
      return res.data.ad as IProduct;
    },
    onSuccess: (data) => {
      toast.success('Product removed', {
        style: {
          background: '#e7f6f1',
          color: '#16a87e',
        },
      });
      revalidateTag([data.subCategory.toLocaleLowerCase()]);
      router.push(redirect(data.subCategory));
    },
    onError: (error) => {
      toast.error(
        // @ts-ignore
        error.response.data.message
          ? // @ts-ignore
          error.response.data.message
          : error.message,
        {
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};

// ...........Brand......................

export const useBrand = (): UseQueryResult<IBrand[]> => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/company/all`);
      return res.data.ads;
    },
    staleTime: Infinity,
  });
};

// ................. Cast..........................

export const useCast = (search: string): UseQueryResult<IProduct[]> => {
  return useQuery({
    queryKey: ['casts', search],
    queryFn: async () => {
      const res = await axios.get(
        `${apiUrl}/ad/filter?category=Digital&subCategory=Influencers&title=${search}&skipPage=1&limitPageSize=20`,
      );
      return res.data.data;
    },
    staleTime: Infinity,
  });
};

// ................. Orders..........................

// Filter Orders with search, status, pagination
export const useFilterOrders = (params: IOrderFilterParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append('search', params.search);
      if (params.status) queryParams.append('status', params.status);
      if (params.sellerResponse) queryParams.append('sellerResponse', params.sellerResponse);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const res = await axios.get(`${apiUrl}/order/filter?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      return res.data as IOrderFilterResponse;
    },
  });
};

// Get Order Details
export const useOrderDetails = (orderShortId: string) => {
  return useQuery({
    queryKey: ['order-details', orderShortId],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/order/getOrderDetails/${orderShortId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      return res.data as IOrderDetailsResponse;
    },
    enabled: !!orderShortId,
  });
};

// Delete Order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderShortId: string) => {
      const res = await axios.delete(`${apiUrl}/order/delete/${orderShortId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Order deleted successfully', {
        style: {
          background: '#e7f6f1',
          color: '#16a87e',
        },
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(
        // @ts-ignore
        error.response?.data?.message || error.message,
        {
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};

// Edit Order
export const useEditOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderShortId, data }: { orderShortId: string; data: Partial<IOrder> }) => {
      const res = await axios.put(`${apiUrl}/order/edit/${orderShortId}`, data, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success('Order updated successfully', {
        style: {
          background: '#e7f6f1',
          color: '#16a87e',
        },
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order-details', variables.orderShortId] });
    },
    onError: (error) => {
      toast.error(
        // @ts-ignore
        error.response?.data?.message || error.message,
        {
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};

// Get Order Invoice
export const useOrderInvoice = (orderShortId: string) => {
  return useQuery({
    queryKey: ['order-invoice', orderShortId],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/order/invoice/${orderShortId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      return res.data;
    },
    enabled: !!orderShortId,
  });
};

// Bulk Update Orders
export const useBulkUpdateOrders = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      orderIds: string[];
      action?: string;
      status?: string;
      sellerResponse?: string;
    }) => {
      const res = await axios.put(`${apiUrl}/order/bulk-update`, data, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Orders updated successfully', {
        style: {
          background: '#e7f6f1',
          color: '#16a87e',
        },
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(
        // @ts-ignore
        error.response?.data?.message || error.message,
        {
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};

// Get Order Stats
export const useOrderStats = () => {
  return useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/order/stats`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      return res.data;
    },
  });
};

export const useNotifications = (params?: { page?: number; limit?: number; isRead?: boolean }) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.isRead !== undefined) queryParams.append('isRead', params.isRead.toString());

      const res = await axios.get(`${apiUrl}/notifications/seller?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      return res.data as INotificationResponse;
    },
    refetchInterval: 30000,
  });
};

export const useMarkNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notificationIds?: string[]) => {
      const res = await axios.put(
        `${apiUrl}/notifications/seller/mark-read`,
        { notificationIds: notificationIds || [] },
        {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notifications marked as read', {
        style: {
          background: '#e7f6f1',
          color: '#16a87e',
        },
      });
    },
    onError: (error) => {
      toast.error(
        // @ts-ignore
        error.response?.data?.message || error.message,
        {
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};

// ...............Reviews......................................
export const useReviews = (params: IReviewFilterParams = {}) => {
  return useQuery({
    queryKey: ['reviews', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params.status) queryParams.append('status', params.status);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const res = await axios.get(`${apiUrl}/reviews/all?${queryParams.toString()}`);
      return res.data as IReviewResponse;
    },
  });
};

export const useReviewStats = () => {
  return useQuery({
    queryKey: ['reviewStats'],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/reviews/stats`);
      return res.data as IReviewStats;
    },
  });
};

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: 'pending' | 'published' | 'rejected';
    }) => {
      const res = await axios.put(`${apiUrl}/reviews/status/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviewStats'] });
      toast.success('Review status updated successfully', {
        style: {
          background: '#e7f6f1',
          color: '#16a87e',
        },
      });
    },
    onError: (error) => {
      toast.error(
        // @ts-ignore
        error.response?.data?.message || error.message,
        {
          style: {
            background: '#ffebe6',
            color: '#fd381d',
          },
        },
      );
    },
  });
};
