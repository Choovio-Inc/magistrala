import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  dataLoadTime: number;
  searchTime: number;
  memoryUsage?: number;
}

interface UsePerformanceMonitorOptions {
  enabled?: boolean;
  logToConsole?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

export const usePerformanceMonitor = (options: UsePerformanceMonitorOptions = {}) => {
  const { enabled = true, logToConsole = false, onMetricsUpdate } = options;
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    dataLoadTime: 0,
    searchTime: 0,
    memoryUsage: 0
  });
  const startTimeRef = useRef<number>(0);

  const startTimer = useCallback(() => {
    if (!enabled) return;
    startTimeRef.current = performance.now();
  }, [enabled]);

  const endTimer = useCallback((type: keyof PerformanceMetrics) => {
    if (!enabled) return;
    
    const endTime = performance.now();
    const duration = endTime - startTimeRef.current;
    
    metricsRef.current[type] = duration;
    
    if (logToConsole) {
      console.log(`Performance - ${type}: ${duration.toFixed(2)}ms`);
    }
    
    if (onMetricsUpdate) {
      onMetricsUpdate(metricsRef.current);
    }
  }, [enabled, logToConsole, onMetricsUpdate]);

  const measureDataLoad = useCallback(async <T>(promise: Promise<T>): Promise<T> => {
    startTimer();
    try {
      const result = await promise;
      endTimer('dataLoadTime');
      return result;
    } catch (error) {
      endTimer('dataLoadTime');
      throw error;
    }
  }, [startTimer, endTimer]);

  const measureSearch = useCallback((searchFunction: () => void) => {
    startTimer();
    searchFunction();
    endTimer('searchTime');
  }, [startTimer, endTimer]);

  const measureRender = useCallback((renderFunction: () => void) => {
    startTimer();
    renderFunction();
    endTimer('renderTime');
  }, [startTimer, endTimer]);

  const getMetrics = useCallback(() => {
    return { ...metricsRef.current };
  }, []);

  const resetMetrics = useCallback(() => {
    metricsRef.current = {
      renderTime: 0,
      dataLoadTime: 0,
      searchTime: 0,
      memoryUsage: 0
    };
  }, []);

  // Monitor memory usage if available
  useEffect(() => {
    if (!enabled || !('memory' in performance)) return;

    const updateMemoryUsage = () => {
      const memory = (performance as any).memory;
      if (memory) {
        metricsRef.current.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
      }
    };

    const interval = setInterval(updateMemoryUsage, 5000);
    return () => clearInterval(interval);
  }, [enabled]);

  return {
    measureDataLoad,
    measureSearch,
    measureRender,
    getMetrics,
    resetMetrics,
    startTimer,
    endTimer
  };
}; 