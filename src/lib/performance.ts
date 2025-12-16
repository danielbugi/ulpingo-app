/**
 * Performance monitoring utilities
 */

import React from 'react';

export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();

  /**
   * Measure the execution time of a function
   */
  static async measure<T>(name: string, fn: () => Promise<T> | T): Promise<T> {
    const start = performance.now();

    try {
      const result = await fn();
      const duration = performance.now() - start;

      this.recordMetric(name, duration);

      if (process.env.NODE_ENV === 'development' && duration > 1000) {
        console.warn(
          `⚠️  Slow operation: ${name} took ${duration.toFixed(2)}ms`
        );
      }

      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(
        `❌ Error in ${name} after ${duration.toFixed(2)}ms:`,
        error
      );
      throw error;
    }
  }

  /**
   * Record a metric
   */
  private static recordMetric(name: string, duration: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(duration);

    // Keep only last 100 measurements
    if (this.metrics.get(name)!.length > 100) {
      this.metrics.get(name)!.shift();
    }
  }

  /**
   * Get statistics for a metric
   */
  static getStats(name: string): {
    count: number;
    avg: number;
    min: number;
    max: number;
    p95: number;
  } | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    const sum = sorted.reduce((acc, val) => acc + val, 0);

    return {
      count: sorted.length,
      avg: sum / sorted.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p95: sorted[Math.floor(sorted.length * 0.95)],
    };
  }

  /**
   * Log all metrics (for debugging)
   */
  static logAllStats(): void {
    console.log('📊 Performance Metrics:');
    const metricNames = Array.from(this.metrics.keys());
    for (const name of metricNames) {
      const stats = this.getStats(name);
      if (stats) {
        console.log(
          `  ${name}: avg=${stats.avg.toFixed(2)}ms, p95=${stats.p95.toFixed(
            2
          )}ms, count=${stats.count}`
        );
      }
    }
  }

  /**
   * Clear all metrics
   */
  static clear(): void {
    this.metrics.clear();
  }
}

/**
 * HOC to measure React component render time
 */
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
): React.ComponentType<P> {
  const name = componentName || Component.displayName || Component.name;

  return function PerformanceMonitoredComponent(props: P) {
    const renderStart = performance.now();

    React.useEffect(() => {
      const renderDuration = performance.now() - renderStart;
      PerformanceMonitor['recordMetric'](`render:${name}`, renderDuration);
    });

    return React.createElement(Component, props);
  };
}

// Export for development debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).__performanceMonitor = PerformanceMonitor;
}
