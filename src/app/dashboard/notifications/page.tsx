'use client';

import React, { useState } from 'react';
import { useNotifications, useMarkNotificationsRead } from '@/hooks/use-query';
import NotificationHeader from '@/components/dashboard/notifications/NotificationHeader';
import NotificationList from '@/components/dashboard/notifications/NotificationList';

const NotificationsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  const { data, isLoading, refetch } = useNotifications({
    page: currentPage,
    limit,
  });

  const markAsReadMutation = useMarkNotificationsRead();

  const notifications = data?.notifications || [];
  const unreadCount = data?.pagination?.unreadCount || 0;
  const hasUnread = unreadCount > 0;

  const handleMarkAllRead = () => {
    markAsReadMutation.mutate([], {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const handleNotificationClick = (notificationId: string) => {
    const notification = notifications.find((n) => n._id === notificationId);
    if (notification && !notification.isRead) {
      markAsReadMutation.mutate([notificationId], {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <NotificationHeader
        onMarkAllRead={handleMarkAllRead}
        isMarking={markAsReadMutation.isPending}
        hasUnread={hasUnread}
      />

      <NotificationList
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        isLoading={isLoading}
      />

      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {data.pagination.currentPage} of {data.pagination.totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(data.pagination.totalPages, p + 1))}
            disabled={currentPage === data.pagination.totalPages || isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
