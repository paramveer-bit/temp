import React from 'react';
import { Button } from '@/components/ui/button';
import RefreshIcon from '@mui/icons-material/Refresh';

interface LoadMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
  isLoading?: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, hasMore, isLoading }) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={onClick}
        disabled={isLoading}
        variant="ghost"
        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
      >
        <RefreshIcon className="h-5 w-5 mr-2" />
        {isLoading ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
