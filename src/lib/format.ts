/**
 * Time labels per the brand book: relative under 24 h ("14 min ago", "2 h ago"),
 * then "Yesterday", then a short date ("4 Nov", with the year if it differs).
 */
export function formatItemTime(date: Date, now: Date = new Date()): string {
  const minutes = Math.floor((now.getTime() - date.getTime()) / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (minutes < 24 * 60) return `${Math.floor(minutes / 60)} h ago`;

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60_000);
  if (date >= startOfYesterday) return 'Yesterday';

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(date.getFullYear() !== now.getFullYear() ? { year: 'numeric' } : {})
  });
}

/** First letter of a source name, for avatars. */
export function initial(name: string): string {
  return (name.trim()[0] ?? '?').toUpperCase();
}
