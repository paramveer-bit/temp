'use client';

import React from 'react';
import { INotification } from '@/types/types';
import NotificationListItem from './NotificationListItem';

interface NotificationListProps {
  notifications: INotification[];
  onNotificationClick: (notificationId: string) => void;
  isLoading?: boolean;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onNotificationClick,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 text-sm">Loading notifications...</div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 text-sm">No notifications found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {notifications.map((notification) => (
        <NotificationListItem
          key={notification._id}
          notification={notification}
          onClick={() => onNotificationClick(notification._id)}
        />
      ))}
    </div>
  );
};

export default NotificationList;
