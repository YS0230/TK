import { useEffect, useRef } from 'react'
import type { Day } from '../data/trip'
import { shortDate } from '../lib/date'
import { href } from '../lib/router'

interface DaySelectorProps {
  days: Day[]
  selectedDay: number
  /** 今天對應的天數（非旅程期間為 undefined） */
  todayDay?: number
}

export function DaySelector({ days, selectedDay, todayDay }: DaySelectorProps) {
  const listRef = useRef<HTMLOListElement>(null)

  // 讓選取中的 Day 捲到可視範圍中央
  useEffect(() => {
    const list = listRef.current
    const item = list?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!list || !item) return
    list.scrollTo({
      left: item.offsetLeft - (list.clientWidth - item.clientWidth) / 2,
      behavior: 'smooth',
    })
  }, [selectedDay])

  return (
    <nav aria-label="選擇日期" className="border-b border-line bg-paper/95 backdrop-blur">
      <ol
        ref={listRef}
        className="no-scrollbar relative mx-auto flex max-w-[1200px] snap-x gap-2 overflow-x-auto px-4 py-2.5 md:px-6 lg:px-8"
      >
        {days.map((day) => {
          const selected = day.day === selectedDay
          const isToday = day.day === todayDay
          return (
            <li key={day.day} className="shrink-0 snap-center">
              <a
                href={href('itinerary', day.day)}
                aria-current={selected ? 'true' : undefined}
                aria-label={`第 ${day.day} 天 ${shortDate(day.date)} ${day.title}${isToday ? '（今天）' : ''}`}
                className={`flex min-h-16 min-w-28 flex-col justify-center rounded-2xl border px-3.5 py-2 transition-colors duration-200 ${
                  selected
                    ? 'border-ink bg-ink text-paper shadow-card'
                    : isToday
                      ? 'border-aka bg-aka-soft text-ink'
                      : 'border-line bg-card text-ink'
                }`}
              >
                <span className="flex items-center gap-1.5 text-xs font-bold tracking-widest">
                  DAY {day.day}
                  {isToday && (
                    <span className="rounded-full bg-aka px-1.5 text-[10px] tracking-normal text-white">
                      今天
                    </span>
                  )}
                </span>
                <span className="text-base font-bold tabular-nums">{shortDate(day.date)}</span>
                <span className={`text-xs whitespace-nowrap ${selected ? 'text-paper/80' : 'text-ink-soft'}`}>
                  {day.title}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
