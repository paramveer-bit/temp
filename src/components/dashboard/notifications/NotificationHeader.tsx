'use client';

import React from 'react';

interface NotificationHeaderProps {
  onMarkAllRead: () => void;
  isMarking: boolean;
  hasUnread: boolean;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  onMarkAllRead,
  isMarking,
  hasUnread,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">Notifications</h1>
      {hasUnread && (
        <button
          onClick={onMarkAllRead}
          disabled={isMarking}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isMarking ? 'Marking...' : 'Mark all read'}
        </button>
      )}
    </div>
  );
};

export default NotificationHeader;
