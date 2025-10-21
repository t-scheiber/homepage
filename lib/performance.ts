// Performance monitoring utilities

export const reportWebVitals = (metric: any) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  // Send to analytics in production
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', 'Web Vitals', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  }
};

// Measure custom performance metrics
export const measurePerformance = (metricName: string) => {
  if (typeof window !== 'undefined' && window.performance) {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigationTiming) {
      const metrics = {
        dns: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
        tcp: navigationTiming.connectEnd - navigationTiming.connectStart,
        ttfb: navigationTiming.responseStart - navigationTiming.requestStart,
        download: navigationTiming.responseEnd - navigationTiming.responseStart,
        domInteractive: navigationTiming.domInteractive - navigationTiming.fetchStart,
        domComplete: navigationTiming.domComplete - navigationTiming.fetchStart,
      };

      console.log(`Performance Metrics for ${metricName}:`, metrics);
      return metrics;
    }
  }
  return null;
};
