import { useCallback } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

export type DashboardTab = 'dashboard' | 'groups' | 'events' | 'piscines' | 'checkpoints' | 'leaderboard' | 'audits' | 'subjects' | string

export const useDashboardRouting = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const getCurrentTab = useCallback((): DashboardTab => {
    const path = location.pathname

    if (path === '/dashboard') return 'dashboard'

    if (path.startsWith('/dashboard/piscines/')) {
      const piscineType = params.piscineType || path.split('/').pop()
      return `piscine-${piscineType}`
    }

    const segments = path.split('/')
    if (segments.length >= 3 && segments[1] === 'dashboard') {
      return segments[2] as DashboardTab
    }

    return 'dashboard'
  }, [location.pathname, params.piscineType])

  const navigateToTab = useCallback((tab: DashboardTab) => {
    if (tab.startsWith('piscine-')) {
      const piscineType = tab.replace('piscine-', '')
      navigate(`/dashboard/piscines/${piscineType}`)
    } else if (tab === 'dashboard') {
      navigate('/dashboard')
    } else {
      navigate(`/dashboard/${tab}`)
    }
  }, [navigate])

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

  const getBreadcrumbs = useCallback(() => {
    const currentTab = getCurrentTab()
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard' }]

    if (currentTab !== 'dashboard') {
      if (currentTab.startsWith('piscine-')) {
        const piscineType = currentTab.replace('piscine-', '')
        breadcrumbs.push({ label: 'Piscines', path: '/dashboard/piscines' })
        breadcrumbs.push({ label: piscineType.charAt(0).toUpperCase() + piscineType.slice(1), path: `/dashboard/piscines/${piscineType}` })
      } else {
        breadcrumbs.push({ label: currentTab.charAt(0).toUpperCase() + currentTab.slice(1), path: `/dashboard/${currentTab}` })
      }
    }

    return breadcrumbs
  }, [getCurrentTab])

  return {
    getCurrentTab,
    navigateToTab,
    getQueryParams,
    updateQueryParams,
    updateQueryParam,
    clearQueryParams,
    getBreadcrumbs,
    setTab: navigateToTab,
    getTab: getCurrentTab
  }
}

export const useTabRouting = useDashboardRouting

export const useRouteAnalytics = () => {
  return {
    trackPageView: (path: string) => {
    },
    trackEvent: (event: string, data?: any) => {
    }
  }
}
