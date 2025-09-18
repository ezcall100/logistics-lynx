/**
 * Message Utilities for Communication Hub
 * Handles message formatting, validation, and common operations
 */

// Message validation
export const validateMessage = (message: string): boolean => {
  return message.trim().length > 0 && message.trim().length <= 1000;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Message formatting
export const formatMessageTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) { // Less than 1 minute
    return 'Just now';
  } else if (diff < 3600000) { // Less than 1 hour
    const minutes = Math.floor(diff / 60000);
    return `${minutes} min ago`;
  } else if (diff < 86400000) { // Less than 1 day
    const hours = Math.floor(diff / 3600000);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diff / 86400000);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

export const formatMessagePreview = (message: string, maxLength: number = 50): string => {
  if (message.length <= maxLength) {
    return message;
  }
  return message.substring(0, maxLength) + '...';
};

// Priority helpers
export const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'low':
      return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

// Status helpers
export const getStatusColor = (status: 'online' | 'away' | 'offline'): string => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'away':
      return 'bg-yellow-500';
    case 'offline':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

// Call type helpers
export const getCallTypeColor = (type: 'incoming' | 'outgoing' | 'missed'): string => {
  switch (type) {
    case 'incoming':
      return 'bg-green-400';
    case 'outgoing':
      return 'bg-blue-400';
    case 'missed':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
};

// Event type helpers
export const getEventTypeColor = (type: 'meeting' | 'call' | 'event'): string => {
  switch (type) {
    case 'meeting':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    case 'call':
      return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
    case 'event':
      return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

// Avatar generation
export const generateAvatar = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Message search
export const searchMessages = (messages: any[], query: string, fields: string[]): any[] => {
  if (!query.trim()) return messages;
  
  const lowercaseQuery = query.toLowerCase();
  return messages.filter(message => 
    fields.some(field => {
      const value = message[field];
      return value && value.toString().toLowerCase().includes(lowercaseQuery);
    })
  );
};

// Message sorting
export const sortMessagesByTime = (messages: any[], ascending: boolean = false): any[] => {
  return [...messages].sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return ascending ? timeA - timeB : timeB - timeA;
  });
};

// Badge count calculation
export const calculateBadgeCount = (items: any[], unreadField: string = 'unread'): number => {
  return items.filter(item => item[unreadField]).length;
};

// Message truncation for display
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate unique IDs
export const generateId = (): number => {
  return Date.now() + Math.random();
};

// Debounce utility for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};