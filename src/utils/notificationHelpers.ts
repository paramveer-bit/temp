import { formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'a minute ago';
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes === 1) {
      return 'a minute ago';
    }
    return `${minutes} minutes ago`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    if (hours === 1) {
      return 'an hour ago';
    }
    return `about ${hours} hours ago`;
  }

  // Days
  const days = Math.floor(diffInSeconds / 86400);
  if (days === 1) {
    return 'a day ago';
  }
  if (days < 7) {
    return `about ${days} days ago`;
  }

  // For longer periods, use date-fns
  return formatDistanceToNow(date, { addSuffix: true });
};

export const parseNotificationMessage = (message: string) => {
  const parts: Array<{ text: string; isHighlight: boolean }> = [];
  let currentIndex = 0;

  // Patterns for text that should be highlighted (quoted text, keywords, etc.)
  const highlightPatterns = [
    { pattern: /"([^"]+)"/g, isHighlight: true }, // Quoted text
    { pattern: /\b(In progress|Review|Completed|Joined|Change)\b/gi, isHighlight: true }, // Keywords
    { pattern: /\b(Getting started with Substance)\b/gi, isHighlight: true }, // Specific phrases
  ];

  const highlights: Array<{ start: number; end: number; text: string }> = [];

  // Find all matches for highlight patterns
  highlightPatterns.forEach(({ pattern }) => {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(message)) !== null) {
      const existingHighlight = highlights.find(
        (h) => h.start === match!.index && h.end === match!.index + match![0].length,
      );
      if (!existingHighlight) {
        highlights.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
        });
      }
    }
  });

  // Sort highlights by position
  highlights.sort((a, b) => a.start - b.start);

  // Build parts array with highlighted and non-highlighted segments
  highlights.forEach((highlight) => {
    if (highlight.start > currentIndex) {
      parts.push({
        text: message.substring(currentIndex, highlight.start),
        isHighlight: false,
      });
    }
    parts.push({
      text: highlight.text,
      isHighlight: true,
    });
    currentIndex = highlight.end;
  });

  // Add remaining text
  if (currentIndex < message.length) {
    parts.push({
      text: message.substring(currentIndex),
      isHighlight: false,
    });
  }

  // Fallback: if no parts were created, return the whole message
  if (parts.length === 0) {
    parts.push({ text: message, isHighlight: false });
  }

  return parts;
};

export const extractUserName = (message: string): string | null => {
  const patterns = [
    /^([A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+)/, // Three-word name
    /^([A-Z][a-z]+ [A-Z][a-z]+)/, // Two-word name
    /^([A-Z][a-z]+)/, // Single word name
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      const name = match[1];
      // Return name if it's a full name (2+ words) or if message contains greeting keywords
      if (name.split(' ').length >= 2 || message.includes('Hi,') || message.includes('Welcome')) {
        return name;
      }
    }
  }

  return null;
};

export const getNotificationAvatar = (notification: {
  title?: string;
  message: string;
  type: string;
}): { type: 'user' | 'system' | 'info'; initials?: string; color?: string } => {
  const userName = extractUserName(notification.message);
  const messageLower = notification.message.toLowerCase();
  const titleLower = notification.title?.toLowerCase() || '';

  // System notifications (Welcome, Tips) - purple background with icon
  if (notification.type === 'general' && titleLower.includes('welcome')) {
    return {
      type: 'system',
      color: 'purple',
    };
  }

  if (notification.type === 'general' && messageLower.includes('tips')) {
    return {
      type: 'system',
      color: 'purple',
    };
  }

  // Info notifications (Completed without user name) - gray background with info icon
  if (messageLower.includes('completed') && !userName) {
    return {
      type: 'info',
      color: 'gray',
    };
  }

  // User notifications - show user avatar with initials
  if (userName) {
    const initials = userName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
    return {
      type: 'user',
      initials,
    };
  }

  // Default: system notification with purple background
  return {
    type: 'system',
    color: 'purple',
  };
};
