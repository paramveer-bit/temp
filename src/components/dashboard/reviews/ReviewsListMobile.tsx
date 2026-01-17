import React from 'react';
import ReviewCard from './ReviewCard';
import { IReview } from '@/types/types';

interface ReviewsListMobileProps {
  reviews: IReview[];
}

const ReviewsListMobile: React.FC<ReviewsListMobileProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
        <p className="text-gray-500">No reviews found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsListMobile;
