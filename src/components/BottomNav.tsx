import { href, type Page } from '../lib/router'
import { NAV_ITEMS } from './navItems'

interface BottomNavProps {
  current: Page
}

export function BottomNav({ current }: BottomNavProps) {
  return (
    <nav
      aria-label="底部導覽"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {NAV_ITEMS.map((item) => {
          const active = item.page === current
          return (
            <li key={item.page}>
              <a
                href={href(item.page)}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-16 flex-col items-center justify-center gap-1 text-xs transition-colors ${
                  active ? 'font-bold text-aka' : 'text-ink-soft'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-0 h-0.5 w-8 rounded-full bg-aka transition-opacity duration-200 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <item.icon size={22} strokeWidth={active ? 2.4 : 1.8} aria-hidden="true" />
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
