import { useEffect, useState } from 'react'
import type { Day, Trip } from '../data/trip'

export type TripStatus =
  | { phase: 'before'; daysLeft: number }
  | { phase: 'during'; day: Day }
  | { phase: 'after' }

/** 以裝置當地時間取得 YYYY-MM-DD */
export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** 2026-10-08 → 10/08 */
export function shortDate(iso: string): string {
  const [, month, day] = iso.split('-')
  return `${month}/${day}`
}

export function getTripStatus(trip: Trip, todayISO: string): TripStatus {
  if (todayISO < trip.startDate) {
    const msPerDay = 24 * 60 * 60 * 1000
    const diff = parseISODate(trip.startDate).getTime() - parseISODate(todayISO).getTime()
    return { phase: 'before', daysLeft: Math.round(diff / msPerDay) }
  }
  const day = trip.days.find((item) => item.date === todayISO)
  return day ? { phase: 'during', day } : { phase: 'after' }
}

/** 目前日期（跨日或 App 回到前景時自動更新） */
export function useToday(): string {
  const [today, setToday] = useState(() => toISODate(new Date()))

  useEffect(() => {
    const refresh = () => setToday(toISODate(new Date()))
    const timer = window.setInterval(refresh, 60_000)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])

  return today
}
