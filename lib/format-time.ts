// Utility to format time consistently on both server and client
export function formatTime(date: Date): string {
  // Ensure we're working with a valid date
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  
  // Use a simplified format that doesn't depend on locale
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  
  return `${displayHours}:${displayMinutes} ${ampm}`;
}