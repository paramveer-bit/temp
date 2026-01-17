import React from 'react';
import ReviewCard from './ReviewCard';
import { IReview } from '@/types/types';

interface ReviewsListProps {
  reviews: IReview[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
        <p className="text-gray-500 text-lg">No reviews found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
