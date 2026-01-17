import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useReviews, useReviewStats, useUpdateReviewStatus } from '@/hooks/use-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { IReview } from '@/types/types';

type ReviewTab = 'published' | 'pending';

export const useReviewsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ReviewTab>('published');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [accumulatedReviews, setAccumulatedReviews] = useState<IReview[]>([]);

  // Redirect if not logged in
  useEffect(() => {
    const hasToken = typeof document !== 'undefined' && document.cookie.includes('token=');
    if (!hasToken) {
      router.replace('/sign-in');
    }
  }, [router]);

  // Query params for filtering
  const filterParams = useMemo(
    () => ({
      status: activeTab,
      page: currentPage,
      limit: itemsPerPage,
    }),
    [activeTab, currentPage, itemsPerPage],
  );

  const { data: reviewsData, isLoading, refetch } = useReviews(filterParams);
  const { data: statsData } = useReviewStats();
  const updateStatusMutation = useUpdateReviewStatus();

  // Reset accumulated reviews when tab changes or on first load
  useEffect(() => {
    setAccumulatedReviews([]);
    setCurrentPage(1);
  }, [activeTab]);

  // Accumulate reviews when new data arrives
  useEffect(() => {
    if (reviewsData?.reviews) {
      if (currentPage === 1) {
        // First page - replace
        setAccumulatedReviews(reviewsData.reviews);
      } else {
        // Subsequent pages - append (avoid duplicates)
        setAccumulatedReviews((prev) => {
          const existingIds = new Set(prev.map((r) => r._id));
          const newReviews = reviewsData.reviews.filter((r) => !existingIds.has(r._id));
          return [...prev, ...newReviews];
        });
      }
    }
  }, [reviewsData, currentPage]);

  // Wrap reviews in useMemo - use accumulated reviews
  const reviews = useMemo(() => accumulatedReviews, [accumulatedReviews]);

  // Pagination handling
  const pagination = useMemo(() => {
    return {
      currentPage: reviewsData?.currentPage || 1,
      totalPages: reviewsData?.totalPages || 1,
      total: reviews.length,
      hasNext: (reviewsData?.currentPage || 1) < (reviewsData?.totalPages || 1),
      hasPrev: (reviewsData?.currentPage || 1) > 1,
    };
  }, [reviewsData, reviews.length]);

  // Review stats
  const stats = useMemo(() => {
    if (!statsData) return null;

    const ratingCounts: Record<number, number> = {};
    statsData.stats.forEach((stat) => {
      ratingCounts[stat._id] = stat.count;
    });

    return {
      avgRating: statsData.avgRating || 0,
      totalReviews: statsData.totalReviews || 0,
      ratingCounts: {
        5: ratingCounts[5] || 0,
        4: ratingCounts[4] || 0,
        3: ratingCounts[3] || 0,
        2: ratingCounts[2] || 0,
        1: ratingCounts[1] || 0,
      },
    };
  }, [statsData]);

  // Refresh reviews
  const handleRefresh = () => {
    setCurrentPage(1);
    setAccumulatedReviews([]);
    queryClient.invalidateQueries({ queryKey: ['reviews'] });
    queryClient.invalidateQueries({ queryKey: ['reviewStats'] });
    refetch();
    toast.success('Reviews refreshed', {
      style: { background: '#e7f6f1', color: '#16a87e' },
    });
  };

  // Tab change
  const handleTabChange = (tab: ReviewTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setAccumulatedReviews([]);
  };

  // Update review status
  const handleUpdateStatus = async (
    reviewId: string,
    status: 'pending' | 'published' | 'rejected',
  ) => {
    try {
      await updateStatusMutation.mutateAsync({ id: reviewId, status });
    } catch {
      // Error handled in mutation
    }
  };

  // Load more reviews
  const handleLoadMore = () => {
    if (pagination.hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return {
    activeTab,
    currentPage,
    itemsPerPage,
    reviews,
    pagination,
    stats,
    isLoading,
    setCurrentPage,
    handleRefresh,
    handleTabChange,
    handleUpdateStatus,
    handleLoadMore,
  };
};
