import { trip } from '../data/trip'
import { href, type Page } from '../lib/router'
import { NAV_ITEMS } from './navItems'

interface HeaderProps {
  current: Page
}

export function Header({ current }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <a href={href('home')} className="flex min-h-11 items-center gap-2 rounded-lg">
          <span className="h-3 w-3 rounded-full bg-aka" aria-hidden="true" />
          <span className="font-bold tracking-wide text-ink">{trip.name}</span>
          <span className="text-xs text-ink-soft tabular-nums">{trip.code}</span>
        </a>
        <nav aria-label="主要導覽" className="hidden md:block">
          <ul className="flex gap-1">
            {NAV_ITEMS.map((item) => {
              const active = item.page === current
              return (
                <li key={item.page}>
                  <a
                    href={href(item.page)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors ${
                      active ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-line/60'
                    }`}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
