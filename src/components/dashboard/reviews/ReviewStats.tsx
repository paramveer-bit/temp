import React from 'react';
import StarIcon from '@mui/icons-material/Star';

interface ReviewStatsProps {
  avgRating: number;
  totalReviews: number;
  ratingCounts: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ avgRating, totalReviews, ratingCounts }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const getMaxCount = () => {
    return Math.max(...Object.values(ratingCounts));
  };

  const maxCount = getMaxCount();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : index < rating
              ? 'text-yellow-400 fill-yellow-400 opacity-50'
              : 'text-gray-300'
        }`}
      />
    ));
  };

  const getBarColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 3) return 'bg-green-500';
    return 'bg-orange-500';
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Average Rating */}
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold text-gray-900">
            {avgRating.toFixed(1).replace('.', ',')}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">{renderStars(avgRating)}</div>
            <div className="text-sm text-gray-600">From {formatNumber(totalReviews)} review</div>
          </div>
        </div>

        {/* Right side - Rating Breakdown */}
        <div className="flex-1 space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[rating as keyof typeof ratingCounts];
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="w-8 text-sm font-medium text-gray-700">{rating} star</div>
                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getBarColor(rating)} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm font-medium text-gray-700 text-right">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;
