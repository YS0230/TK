import {
  BedDouble,
  CalendarCheck,
  CalendarDays,
  Info,
  LifeBuoy,
  Phone,
  Plane,
  UserRound,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import { ContactCard } from '../components/ContactCard'
import { DayCard } from '../components/DayCard'
import { FlightCard } from '../components/FlightCard'
import { Hero } from '../components/Hero'
import { HotelCard } from '../components/HotelCard'
import { MealCard } from '../components/MealCard'
import { MeetingCard } from '../components/MeetingCard'
import { QuickAction } from '../components/QuickAction'
import { SectionHeader } from '../components/SectionHeader'
import { trip } from '../data/trip'
import { shortDate, type TripStatus } from '../lib/date'
import { href } from '../lib/router'

interface HomePageProps {
  status: TripStatus
}

interface MenuItem {
  label: string
  href: string
  icon: LucideIcon
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HomePage({ status }: HomePageProps) {
  const during = status.phase === 'during'
  // 旅程期間顯示今天；出發前／結束後顯示第一天
  const focusDay = during ? status.day : trip.days[0]
  const prefix = during ? '今日' : '第一天'
  const showMeeting = status.phase === 'before' || focusDay.day === 1
  const flight =
    trip.flights.find((item) => item.direction === (focusDay.day === 1 ? 'outbound' : 'return')) ??
    trip.flights[0]

  const menu: MenuItem[] = [
    { label: '今日行程', href: href('itinerary', focusDay.day), icon: CalendarCheck },
    { label: '完整行程', href: href('itinerary', 1), icon: CalendarDays },
    { label: '航班', href: href('flights'), icon: Plane },
    { label: '住宿', href: href('hotels'), icon: BedDouble },
    { label: '領隊資訊', href: href('contact'), icon: UserRound },
    { label: '緊急聯絡', href: href('contact', 'emergency'), icon: LifeBuoy },
    { label: '餐食', href: href('meals'), icon: Utensils },
    { label: '旅行資訊', href: href('info'), icon: Info },
  ]

  return (
    <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
      <div className="space-y-6">
        <Hero trip={trip} status={status} />

        <section aria-labelledby="quick-title">
          <h2 id="quick-title" className="mb-3 text-lg font-bold text-ink">
            旅途中快速查看
          </h2>
          <div className="grid grid-cols-4 gap-2">
            <QuickAction icon={Plane} label="航班" href={href('flights')} />
            <QuickAction icon={BedDouble} label="今天住哪" onClick={() => scrollToSection('tonight')} />
            <QuickAction icon={Phone} label="聯絡領隊" onClick={() => scrollToSection('leader')} />
            <QuickAction icon={Utensils} label="今天吃什麼" onClick={() => scrollToSection('today-meals')} />
          </div>
        </section>

        {showMeeting && <MeetingCard meeting={trip.meeting} />}

        <section aria-label={`${prefix}行程`}>
          <SectionHeader
            eyebrow={during ? `Day ${focusDay.day}・${shortDate(focusDay.date)}` : '行程預覽'}
            title={`${prefix}行程`}
          />
          <DayCard day={focusDay} isToday={during} showLink />
        </section>
      </div>

      <div className="space-y-6">
        <section id="tonight" className="scroll-mt-20" aria-label="住宿">
          <SectionHeader
            title={during ? '今晚住宿' : '第一晚住宿'}
            action={{ label: '全部住宿', href: href('hotels') }}
          />
          {focusDay.hotel ? (
            <HotelCard hotel={focusDay.hotel} tonight={during} />
          ) : (
            <p className="rounded-2xl border border-line bg-card p-4 text-ink-soft shadow-card">
              今天返回台灣，沒有住宿安排。
            </p>
          )}
        </section>

        <section id="today-meals" className="scroll-mt-20" aria-label="餐食">
          <SectionHeader title={`${prefix}餐食`} action={{ label: '全部餐食', href: href('meals') }} />
          <MealCard meals={focusDay.meals} />
        </section>

        <section aria-label="航班">
          <SectionHeader title="航班" action={{ label: '全部航班', href: href('flights') }} />
          <FlightCard flight={flight} />
        </section>

        <section id="leader" className="scroll-mt-20" aria-label="領隊聯絡">
          <SectionHeader title="領隊聯絡" action={{ label: '全部聯絡', href: href('contact') }} />
          <ContactCard contact={trip.leader} primary />
        </section>

        <section aria-labelledby="menu-title">
          <h2 id="menu-title" className="mb-3 text-lg font-bold text-ink">
            全部功能
          </h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
            {menu.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex min-h-14 items-center gap-2.5 rounded-2xl border border-line bg-card px-4 font-bold text-ink shadow-card transition-transform active:scale-[0.98]"
                >
                  <item.icon size={20} className="shrink-0 text-aka" aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
