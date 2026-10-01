import { ChevronRight } from 'lucide-react'
import type { Day } from '../data/trip'
import { shortDate } from '../lib/date'
import { href } from '../lib/router'
import { StatusBadge } from './StatusBadge'
import { Timeline } from './Timeline'

interface DayCardProps {
  day: Day
  isToday?: boolean
  /** 顯示「查看當日詳細行程」連結（首頁、總覽使用） */
  showLink?: boolean
  /** 標題層級：頁面主標用 h1，其餘用 h3 */
  headingLevel?: 'h1' | 'h3'
}

export function DayCard({ day, isToday = false, showLink = false, headingLevel: Heading = 'h3' }: DayCardProps) {
  return (
    <article className="animate-fade-in rounded-2xl border border-line bg-card p-4 shadow-card">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-aka">
            DAY {day.day}
            {isToday && <StatusBadge tone="aka">今天</StatusBadge>}
          </p>
          <Heading className="mt-0.5 text-xl leading-snug font-bold text-ink">{day.title}</Heading>
          {day.theme && <p className="mt-1 text-sm text-ink-soft">「{day.theme}」</p>}
        </div>
        <p className="shrink-0 text-right">
          <span className="block text-2xl leading-none font-bold text-ink tabular-nums">
            {shortDate(day.date)}
          </span>
          <span className="text-xs text-ink-soft">星期{day.weekday}</span>
        </p>
      </header>

      <div className="mt-4 border-t border-line pt-4">
        <Timeline stops={day.route} />
      </div>

      {showLink && (
        <a
          href={href('itinerary', day.day)}
          className="mt-4 flex min-h-12 items-center justify-center gap-1 rounded-xl bg-ink px-4 font-bold text-paper transition-colors active:bg-ink/85"
        >
          查看 Day {day.day} 詳細行程
          <ChevronRight size={18} aria-hidden="true" />
        </a>
      )}
    </article>
  )
}
