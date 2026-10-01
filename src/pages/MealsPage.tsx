import { MealCard } from '../components/MealCard'
import { PageTitle } from '../components/PageTitle'
import { trip } from '../data/trip'
import { shortDate } from '../lib/date'

export function MealsPage() {
  return (
    <div className="space-y-4">
      <PageTitle title="餐食" subtitle="五天餐食與餐標" />
      <div className="grid gap-4 md:grid-cols-2">
        {trip.days.map((day) => (
          <MealCard
            key={day.day}
            meals={day.meals}
            title={`DAY ${day.day}・${shortDate(day.date)}（${day.weekday}）`}
          />
        ))}
      </div>
    </div>
  )
}
