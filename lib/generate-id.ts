// Utility to generate consistent IDs that work on both server and client
let counter = 0;

export function generateId(prefix: string = 'id'): string {
  // Use a timestamp-based approach for better consistency
  if (typeof window !== 'undefined') {
    // Client-side: use performance.now() for uniqueness
    return `${prefix}-${Date.now()}-${Math.floor(performance.now() * 1000)}`;
  } else {
    // Server-side: use counter
    counter += 1;
    return `${prefix}-ssr-${counter}`;
  }
}