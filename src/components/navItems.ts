import { BedDouble, CalendarDays, House, Phone, Plane, type LucideIcon } from 'lucide-react'
import type { Page } from '../lib/router'

export interface NavItem {
  page: Page
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { page: 'home', label: '首頁', icon: House },
  { page: 'itinerary', label: '行程', icon: CalendarDays },
  { page: 'flights', label: '航班', icon: Plane },
  { page: 'hotels', label: '住宿', icon: BedDouble },
  { page: 'contact', label: '聯絡', icon: Phone },
]
