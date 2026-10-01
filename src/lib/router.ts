import { useEffect, useState } from 'react'

/** 使用 hash 路由：不需要伺服器 rewrite，離線時也能切換頁面 */
export const PAGES = ['home', 'itinerary', 'flights', 'hotels', 'contact', 'meals', 'info'] as const
export type Page = (typeof PAGES)[number]

export interface Route {
  page: Page
  param?: string
}

function isPage(value: string): value is Page {
  return (PAGES as readonly string[]).includes(value)
}

function parseHash(hash: string): Route {
  const [page = '', param] = hash.replace(/^#\/?/, '').split('/')
  return isPage(page) ? { page, param: param || undefined } : { page: 'home' }
}

export function href(page: Page, param?: string | number): string {
  if (page === 'home') return '#/'
  return param === undefined ? `#/${page}` : `#/${page}/${param}`
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
