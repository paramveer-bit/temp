import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-500">{message}</div>
    </div>
  );
};

export default LoadingState;
