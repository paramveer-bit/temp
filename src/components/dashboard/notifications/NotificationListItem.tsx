'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { INotification } from '@/types/types';
import {
  formatRelativeTime,
  parseNotificationMessage,
  getNotificationAvatar,
  extractUserName,
} from '@/utils/notificationHelpers';

interface NotificationListItemProps {
  notification: INotification;
  onClick: () => void;
}

const NotificationListItem: React.FC<NotificationListItemProps> = ({ notification, onClick }) => {
  const router = useRouter();
  const isUnread = !notification.isRead;
  const userName = extractUserName(notification.message);
  const avatarInfo = getNotificationAvatar(notification);

  const handleClick = () => {
    onClick();
    if (notification.type.startsWith('order_') && notification.orderId) {
      router.push(`/dashboard/order-details/${notification.orderId.orderShortId}`);
    }
  };

  const getAvatarContent = () => {
    // System notification with purple background (Welcome, Tips)
    if (avatarInfo.type === 'system' && avatarInfo.color === 'purple') {
      return (
        <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        </div>
      );
    }

    // Info notification with gray background
    if (avatarInfo.type === 'info') {
      return (
        <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 font-semibold text-lg">ⓘ</span>
        </div>
      );
    }

    // User notification with initials (orange background for fallback)
    if (avatarInfo.type === 'user') {
      const initials =
        avatarInfo.initials ||
        (userName
          ? userName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)
          : 'U');

      return (
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName || 'User'}`}
            alt={userName || 'User'}
          />
          <AvatarFallback className="uppercase text-sm font-semibold bg-orange-500 text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
      );
    }

    // Default fallback
    return (
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName || 'User'}`} />
        <AvatarFallback className="uppercase text-sm font-semibold bg-gray-200">
          {userName ? userName.slice(0, 2).toUpperCase() : 'U'}
        </AvatarFallback>
      </Avatar>
    );
  };

  const hasSubstanceBranding = notification.message.includes('Substance Digital Branding');

  const renderMessage = () => {
    const parts: React.ReactNode[] = [];
    const messageText = notification.message;
    let remainingText = messageText;

    // Extract and render user name if present at the start
    if (userName && messageText.startsWith(userName)) {
      parts.push(
        <span key="user-name" className="font-semibold text-gray-900">
          {userName}{' '}
        </span>,
      );
      remainingText = messageText.substring(userName.length).trim();
    }

    // Parse the remaining message for highlights
    const allParts = parseNotificationMessage(remainingText);
    let hasAddedBranding = false;

    allParts.forEach((part, index) => {
      // Handle Substance Digital Branding with icon
      if (
        hasSubstanceBranding &&
        part.text.includes('Substance Digital Branding') &&
        !hasAddedBranding
      ) {
        const beforeBranding = part.text.substring(
          0,
          part.text.indexOf('Substance Digital Branding'),
        );
        if (beforeBranding) {
          parts.push(<span key={`before-branding-${index}`}>{beforeBranding}</span>);
        }
        parts.push(
          <span key="branding" className="inline-flex items-center gap-1.5">
            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
            <span className="text-blue-600">Substance Digital Branding</span>
          </span>,
        );
        hasAddedBranding = true;
      } else if (part.isHighlight) {
        // Highlight quoted text and keywords in purple
        parts.push(
          <span key={`highlight-${index}`} className="text-purple-600 font-medium">
            {part.text}
          </span>,
        );
      } else {
        parts.push(<span key={`text-${index}`}>{part.text}</span>);
      }
    });

    return parts;
  };

  // Determine if we should show online indicator (green dot)
  const showOnlineIndicator = isUnread && avatarInfo.type === 'user' && userName;

  return (
    <div
      onClick={handleClick}
      className={`px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-0 ${
        isUnread ? 'bg-white' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          {getAvatarContent()}
          {showOnlineIndicator && (
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-gray-900 flex-1 leading-relaxed">{renderMessage()}</p>
            <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
              {formatRelativeTime(notification.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationListItem;
