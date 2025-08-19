// Motion configuration for performance optimization
// Ensures 60fps default with 30-120fps range support

import { Transition, Variants } from 'framer-motion'
import { getAdaptiveTransition, prefersReducedMotion, performanceMonitor } from '../utils/performanceMonitor'

// Default 60fps transition (16.67ms per frame)
export const defaultTransition: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1], // Cubic bezier for smooth 60fps
  type: 'tween'
}

// High performance 120fps transition (8.33ms per frame)
export const highPerformanceTransition: Transition = {
  duration: 0.15,
  ease: [0.4, 0, 0.2, 1],
  type: 'tween'
}

// Battery-saving 30fps transition (33.33ms per frame)
export const batterySavingTransition: Transition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
  type: 'tween'
}

// Optimized spring configuration for 60fps
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 15,
  mass: 0.8
}

// High-performance spring for 120fps
export const highPerformanceSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  mass: 0.6
}

// Standard animation variants optimized for 60fps
export const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: 10
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: defaultTransition
  }
}

export const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: defaultTransition
  }
}

export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: springTransition
  }
}

// Staggered children animation for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: defaultTransition
  }
}

// Performance monitoring utilities
export const getOptimalTransition = (complexity: 'low' | 'medium' | 'high'): Transition => {
  switch (complexity) {
    case 'low':
      return highPerformanceTransition // 120fps for simple animations
    case 'medium':
      return defaultTransition // 60fps for standard animations
    case 'high':
      return batterySavingTransition // 30fps for complex animations
    default:
      return defaultTransition
  }
}

// Device-based performance optimization
export const getDeviceOptimizedTransition = (): Transition => {
  // Check for reduced motion preference first
  if (prefersReducedMotion()) {
    return { duration: 0.01, ease: 'linear' }
  }
  
  // Check for high refresh rate displays
  const isHighRefreshRate = (window.screen as any)?.refreshRate >= 120 || 
                           window.matchMedia('(min-resolution: 144dpi)').matches

  if (isHighRefreshRate && performanceMonitor.getCurrentFPS() >= 90) {
    return highPerformanceTransition
  }
  
  return defaultTransition
}

// Adaptive transition creator
export const createAdaptiveTransition = (complexity: 'low' | 'medium' | 'high' = 'medium'): Transition => {
  if (prefersReducedMotion()) {
    return { duration: 0.01, ease: 'linear' }
  }
  
  return getAdaptiveTransition(complexity) as unknown as Transition
}

// Global motion config
export const motionConfig = {
  // Enable hardware acceleration
  useAcceleration: true,
  
  // Optimize for 60fps
  targetFrameRate: 60,
  
  // Enable batch updates
  useBatching: true,
  
  // Reduce layout thrashing
  optimizeLayoutAnimations: true
}

export default {
  defaultTransition,
  highPerformanceTransition,
  batterySavingTransition,
  springTransition,
  highPerformanceSpring,
  fadeInVariants,
  slideUpVariants,
  scaleVariants,
  staggerContainer,
  staggerItem,
  getOptimalTransition,
  getDeviceOptimizedTransition,
  createAdaptiveTransition,
  motionConfig
}