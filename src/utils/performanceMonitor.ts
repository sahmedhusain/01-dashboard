// Performance monitoring for animations
// Ensures animations stay within 30-120fps range with 60fps target

export class AnimationPerformanceMonitor {
  private frameCount = 0
  private lastTime = 0
  private fps = 60
  private isMonitoring = false
  private targetFPS = 60
  
  constructor(targetFPS = 60) {
    this.targetFPS = targetFPS
  }

  start() {
    this.isMonitoring = true
    this.lastTime = performance.now()
    this.measureFPS()
  }

  stop() {
    this.isMonitoring = false
  }

  private measureFPS() {
    if (!this.isMonitoring) return

    const now = performance.now()
    const delta = now - this.lastTime
    
    if (delta >= 1000) { // Calculate FPS every second
      this.fps = Math.round((this.frameCount * 1000) / delta)
      this.frameCount = 0
      this.lastTime = now
      
      // Provide performance feedback
      this.onFPSUpdate(this.fps)
    }
    
    this.frameCount++
    requestAnimationFrame(() => this.measureFPS())
  }

  private onFPSUpdate(fps: number) {
    // Log performance issues
    if (fps < 30) {
      console.warn(`🚨 Low FPS detected: ${fps} (target: ${this.targetFPS})`)
    } else if (fps < this.targetFPS - 10) {
      console.warn(`⚠️ Below target FPS: ${fps} (target: ${this.targetFPS})`)
    }
    
    // Dispatch custom event for performance monitoring
    window.dispatchEvent(new CustomEvent('fps-update', { 
      detail: { fps, target: this.targetFPS } 
    }))
  }

  getCurrentFPS(): number {
    return this.fps
  }

  isPerforming(): boolean {
    return this.fps >= 30 && this.fps <= 120
  }
}

// Global performance monitor instance
export const performanceMonitor = new AnimationPerformanceMonitor(60)

// Auto-start in development mode
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.start()
}

// Frame rate optimization utilities
export const getOptimizedFrameRate = (): number => {
  const fps = performanceMonitor.getCurrentFPS()
  
  if (fps < 40) return 30    // Use 30fps for low-performance devices
  if (fps >= 100) return 120 // Use 120fps for high-refresh displays
  return 60                  // Default to 60fps
}

export const getOptimizedAnimationDuration = (baseDuration: number): number => {
  const fps = getOptimizedFrameRate()
  const frameTime = 1000 / fps
  
  // Ensure duration is a multiple of frame time for smooth animation
  const frames = Math.round(baseDuration / frameTime)
  return frames * frameTime
}

// Adaptive performance settings
export const getAdaptiveTransition = (complexity: 'low' | 'medium' | 'high') => {
  const fps = getOptimizedFrameRate()
  
  const baseConfig = {
    low: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
    medium: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    high: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
  
  const config = baseConfig[complexity]
  
  return {
    ...config,
    duration: getOptimizedAnimationDuration(config.duration * 1000) / 1000
  }
}

// Performance-aware CSS class generator
export const getPerformanceClass = (): string => {
  const fps = performanceMonitor.getCurrentFPS()
  
  if (fps >= 100) return 'animate-120fps'
  if (fps >= 50) return 'animate-60fps'
  return 'animate-30fps'
}

// Hardware acceleration detector
export const supportsHardwareAcceleration = (): boolean => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  return !!ctx
}

// Reduced motion detector
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Device performance classifier
export const getDevicePerformanceClass = (): 'low' | 'medium' | 'high' => {
  const fps = performanceMonitor.getCurrentFPS()
  const hasHWAccel = supportsHardwareAcceleration()
  const cores = navigator.hardwareConcurrency || 4
  
  if (fps >= 90 && hasHWAccel && cores >= 8) return 'high'
  if (fps >= 60 && hasHWAccel && cores >= 4) return 'medium'
  return 'low'
}

// Performance optimization recommendations
export const getPerformanceRecommendations = () => {
  const deviceClass = getDevicePerformanceClass()
  const fps = performanceMonitor.getCurrentFPS()
  
  return {
    deviceClass,
    currentFPS: fps,
    targetFPS: fps < 45 ? 30 : fps < 90 ? 60 : 120,
    recommendations: {
      low: [
        'Use 30fps animations',
        'Reduce animation complexity',
        'Limit concurrent animations',
        'Use CSS transforms over layout changes'
      ],
      medium: [
        'Use 60fps animations',
        'Enable hardware acceleration',
        'Batch DOM updates'
      ],
      high: [
        'Use 120fps for smooth interactions',
        'Enable advanced effects',
        'Use complex animations'
      ]
    }[deviceClass]
  }
}

export default {
  AnimationPerformanceMonitor,
  performanceMonitor,
  getOptimizedFrameRate,
  getOptimizedAnimationDuration,
  getAdaptiveTransition,
  getPerformanceClass,
  supportsHardwareAcceleration,
  prefersReducedMotion,
  getDevicePerformanceClass,
  getPerformanceRecommendations
}