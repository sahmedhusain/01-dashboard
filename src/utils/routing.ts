import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const useTabRouting = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const setTab = useCallback((tab: string) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('tab', tab)
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true })
  }, [navigate, location])

  const getTab = useCallback(() => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('tab') || 'dashboard'
  }, [location])

  const getQueryParams = useCallback(() => {
    const searchParams = new URLSearchParams(location.search)
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }, [location])

  const updateQueryParams = useCallback((params: Record<string, string>) => {
    const searchParams = new URLSearchParams(location.search)
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value)
    })
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true })
  }, [navigate, location])

  const updateQueryParam = useCallback((key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(key, value)
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true })
  }, [navigate, location])

  const clearQueryParams = useCallback(() => {
    navigate(location.pathname, { replace: true })
  }, [navigate, location])

  return {
    setTab,
    getTab,
    getQueryParams,
    updateQueryParams,
    updateQueryParam,
    clearQueryParams
  }
}

export const useRouteAnalytics = () => {
  // Placeholder for route analytics
  return {
    trackPageView: (path: string) => {
      console.log('Page view:', path)
    },
    trackEvent: (event: string, data?: any) => {
      console.log('Event:', event, data)
    }
  }
}
