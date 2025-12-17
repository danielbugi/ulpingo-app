/**
 * Rate limiting utilities for API routes
 * Prevents abuse and DoS attacks
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// For production, consider using Redis
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed
   */
  maxRequests: number;
  /**
   * Time window in milliseconds
   */
  windowMs: number;
  /**
   * Optional custom identifier (defaults to IP)
   */
  identifier?: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status and headers info
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No entry or expired - create new
  if (!entry || entry.resetTime < now) {
    const resetTime = now + config.windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    });

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: resetTime,
    };
  }

  // Entry exists and not expired
  if (entry.count < config.maxRequests) {
    entry.count++;
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - entry.count,
      reset: entry.resetTime,
    };
  }

  // Rate limit exceeded
  return {
    success: false,
    limit: config.maxRequests,
    remaining: 0,
    reset: entry.resetTime,
  };
}

/**
 * Get client identifier from request
 * Uses IP address, with fallback to forwarded headers
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  if (cfConnectingIp) return cfConnectingIp;
  if (realIp) return realIp;
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  // Fallback to 'unknown' if no IP found
  return 'unknown';
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // General API endpoints - 100 requests per minute
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
  },
  // Auth endpoints - more restrictive
  AUTH: {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minute
  },
  // Review/Progress updates - moderate
  PROGRESS: {
    maxRequests: 50,
    windowMs: 60 * 1000, // 1 minute
  },
  // Admin endpoints - very restrictive
  ADMIN: {
    maxRequests: 30,
    windowMs: 60 * 1000, // 1 minute
  },
} as const;
