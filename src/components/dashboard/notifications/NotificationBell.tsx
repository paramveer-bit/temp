'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNotifications, useMarkNotificationsRead } from '@/hooks/use-query';
import NotificationListItem from './NotificationListItem';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useNotifications({ limit: 10 });
  const markAsReadMutation = useMarkNotificationsRead();

  const notifications = data?.notifications || [];
  const unreadCount = data?.pagination?.unreadCount || 0;
  const hasUnread = unreadCount > 0;

  const handleMarkAllRead = () => {
    markAsReadMutation.mutate([]);
  };

  const handleNotificationClick = (notificationId: string) => {
    const notification = notifications.find((n) => n._id === notificationId);
    if (notification && !notification.isRead) {
      markAsReadMutation.mutate([notificationId]);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative text-white focus:outline-none hover:opacity-80 transition-opacity">
          <NotificationsIcon className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[500px] overflow-y-auto p-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {hasUnread && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllRead}
                className="text-xs text-[#201781] hover:text-[#201781]"
                disabled={markAsReadMutation.isPending}
              >
                Mark all read
              </Button>
            )}
          </div>
          {hasUnread && (
            <p className="text-xs text-gray-500">
              {unreadCount} {unreadCount === 1 ? 'unread notification' : 'unread notifications'}
            </p>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500 text-sm">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">No new notifications</div>
          ) : (
            notifications.map((notification) => (
              <NotificationListItem
                key={notification._id}
                notification={notification}
                onClick={() => handleNotificationClick(notification._id)}
              />
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-600"
                onClick={() => {
                  window.location.href = '/dashboard/notifications';
                }}
              >
                View all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
