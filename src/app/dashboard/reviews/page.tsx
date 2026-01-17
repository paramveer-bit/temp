'use client';

import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useReviewsPage } from '@/hooks/useReviewsPage';
import ReviewsHeader from '@/components/dashboard/reviews/ReviewsHeader';
import ReviewsFilterTabs from '@/components/dashboard/reviews/ReviewsFilterTabs';
import ReviewStats from '@/components/dashboard/reviews/ReviewStats';
import ReviewsList from '@/components/dashboard/reviews/ReviewsList';
import ReviewsListMobile from '@/components/dashboard/reviews/ReviewsListMobile';
import LoadMoreButton from '@/components/dashboard/reviews/LoadMoreButton';
import LoadingState from '@/components/dashboard/common/LoadingState';

const ReviewsPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { activeTab, reviews, stats, isLoading, pagination, handleTabChange, handleLoadMore } =
    useReviewsPage();

  if (isLoading && reviews.length === 0) {
    return (
      <main className="flex w-full flex-col items-stretch mt-5 px-4 lg:px-8 max-md:max-w-full">
        <LoadingState message="Loading reviews..." />
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col items-stretch mt-5 px-4 lg:px-8 max-md:max-w-full">
      <ReviewsHeader />

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <ReviewsFilterTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Review Stats Section */}
      {stats && (
        <ReviewStats
          avgRating={stats.avgRating}
          totalReviews={stats.totalReviews}
          ratingCounts={stats.ratingCounts}
        />
      )}

      {/* Reviews List */}
      {!isMobile ? <ReviewsList reviews={reviews} /> : <ReviewsListMobile reviews={reviews} />}

      {/* Load More Button */}
      <LoadMoreButton onClick={handleLoadMore} hasMore={pagination.hasNext} isLoading={isLoading} />
    </main>
  );
};

export default ReviewsPage;
