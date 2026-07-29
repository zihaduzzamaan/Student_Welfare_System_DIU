/* ============================================
   Utility / Helper Functions
   DIU Student Welfare System
   ============================================ */

/**
 * Format an ISO date string to a human-readable format.
 * Example: "2026-07-29T08:00:00Z" → "Jul 29, 2026"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format an ISO date string to include time.
 * Example: "2026-07-29T08:00:00Z" → "Jul 29, 2026 at 2:00 PM"
 */
export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Get relative time string (e.g., "2 hours ago", "3 days ago").
 */
export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(dateStr);
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a slug to a readable label.
 * Example: "student-portal" → "Student Portal"
 */
export function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Truncate a string to a maximum length, adding ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Generate a simple pseudo-random ID (for mock data).
 * Not cryptographically secure — use crypto.randomUUID() for real IDs.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Get initials from a full name (for avatar fallbacks).
 * Example: "Zishan Ahmed" → "ZA"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Debounce a function (e.g., for search input).
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delayMs);
  };
}

/**
 * Join class names, filtering out falsy values.
 * Example: cn('base', isActive && 'active', undefined) → "base active"
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
