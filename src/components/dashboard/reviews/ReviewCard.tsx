import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IReview } from '@/types/types';
import Image from 'next/image';

interface ReviewCardProps {
  review: IReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const userName =
    typeof review.userId === 'object' && review.userId?.name ? review.userId.name : 'Unknown User';

  const productTitle =
    typeof review.productId === 'object' && review.productId?.title
      ? review.productId.title
      : 'Unknown Product';

  const productImages =
    typeof review.productId === 'object' && review.productId?.images ? review.productId.images : [];

  const productImage = productImages.length > 0 ? productImages[0] : null;

  // Product Type
  const productType =
    productTitle.length > 20
      ? productTitle.split(' ').slice(-2).join(' ') || 'N/A'
      : productTitle || 'N/A';

  // Star Ratings
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));

  // Status Badge Variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'pending':
        return 'pending';
      default:
        return 'normal';
    }
  };

  // Review Title & Text
  const firstSentence = review.comment.split(/[.!?]/)[0]?.trim() || '';
  const reviewTitle =
    firstSentence.length > 50 ? firstSentence.substring(0, 50) + '...' : firstSentence || 'Review';

  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* User Info */}
        <div className="flex-shrink-0">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
                alt={userName}
              />
              <AvatarFallback className="uppercase text-sm bg-gray-200">
                {userName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 truncate">{userName}</h3>

              <div className="flex items-center gap-1 mb-2">{renderStars(review.rating)}</div>

              <Badge variant={getStatusVariant(review.status)} className="text-xs">
                {review.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <h4 className="text-lg font-bold text-gray-900 mb-2">{reviewTitle}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
          </div>

          {/* Product Info */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
            {productImage && (
              <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={productImage}
                  alt={productTitle}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{productTitle}</p>
              <p className="text-xs text-gray-500">Type: {productType}</p>
            </div>

            <ArrowForwardIcon className="h-5 w-5 text-purple-600 flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
