import { useEffect } from 'react'
import { BottomNav } from './components/BottomNav'
import { DaySelector } from './components/DaySelector'
import { Header } from './components/Header'
import { trip } from './data/trip'
import { getTripStatus, useToday } from './lib/date'
import { useRoute, type Page } from './lib/router'
import { ContactPage } from './pages/ContactPage'
import { FlightsPage } from './pages/FlightsPage'
import { HomePage } from './pages/HomePage'
import { HotelsPage } from './pages/HotelsPage'
import { InfoPage } from './pages/InfoPage'
import { ItineraryPage } from './pages/ItineraryPage'
import { MealsPage } from './pages/MealsPage'

/** 沒有出現在導覽列的頁面，對應到最接近的導覽項目 */
const NAV_PAGE: Partial<Record<Page, Page>> = { meals: 'home', info: 'home' }

export default function App() {
  const route = useRoute()
  const today = useToday()
  const status = getTripStatus(trip, today)
  const todayDay = status.phase === 'during' ? status.day.day : undefined

  const selectedDay =
    trip.days.find((day) => day.day === Number(route.param)) ??
    (status.phase === 'during' ? status.day : trip.days[0])

  // 換頁時回到頂端；聯絡頁可指定捲到某個區塊（例如緊急聯絡）
  useEffect(() => {
    const target = route.page === 'contact' && route.param ? document.getElementById(route.param) : null
    if (target) target.scrollIntoView({ block: 'start' })
    else window.scrollTo(0, 0)
  }, [route.page, route.param])

  const navPage = NAV_PAGE[route.page] ?? route.page

  return (
    <>
      <Header current={navPage} />
      {route.page === 'itinerary' && (
        <div className="sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-20">
          <DaySelector days={trip.days} selectedDay={selectedDay.day} todayDay={todayDay} />
        </div>
      )}
      <main className="mx-auto max-w-[1200px] px-4 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom))] md:px-6 md:pb-12 lg:px-8">
        {route.page === 'home' && <HomePage status={status} />}
        {route.page === 'itinerary' && (
          <ItineraryPage day={selectedDay} isToday={selectedDay.day === todayDay} />
        )}
        {route.page === 'flights' && <FlightsPage />}
        {route.page === 'hotels' && <HotelsPage today={today} />}
        {route.page === 'contact' && <ContactPage />}
        {route.page === 'meals' && <MealsPage />}
        {route.page === 'info' && <InfoPage todayDay={todayDay} />}
      </main>
      <BottomNav current={navPage} />
    </>
  )
}
