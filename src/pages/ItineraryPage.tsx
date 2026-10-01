import { ActivityCard } from '../components/ActivityCard'
import { DayCard } from '../components/DayCard'
import { HotelCard } from '../components/HotelCard'
import { MealCard } from '../components/MealCard'
import { SectionHeader } from '../components/SectionHeader'
import type { Day } from '../data/trip'

interface ItineraryPageProps {
  day: Day
  isToday: boolean
}

export function ItineraryPage({ day, isToday }: ItineraryPageProps) {
  return (
    // key：切換日期時重新播放淡入並重設展開狀態
    <div key={day.day} className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
      <div className="space-y-6">
        <DayCard day={day} isToday={isToday} headingLevel="h1" />

        <section aria-label="餐食">
          <SectionHeader title="餐食" />
          <MealCard meals={day.meals} />
        </section>

        {day.hotel && (
          <section aria-label="住宿">
            <SectionHeader title="住宿" />
            <HotelCard hotel={day.hotel} tonight={isToday} />
          </section>
        )}
      </div>

      {day.highlights.length > 0 && (
        <section aria-label="景點">
          <SectionHeader title="景點" />
          <div className="space-y-3">
            {day.highlights.map((activity, index) => (
              <ActivityCard key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
