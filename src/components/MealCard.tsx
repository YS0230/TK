import { Coffee, Soup, UtensilsCrossed, type LucideIcon } from 'lucide-react'
import { MEAL_LABEL, type Meal, type MealType } from '../data/trip'

const MEAL_ICON: Record<MealType, LucideIcon> = {
  breakfast: Coffee,
  lunch: UtensilsCrossed,
  dinner: Soup,
}

interface MealCardProps {
  meals: Meal[]
  /** 卡片標題，例如「DAY 1・10/08」；不提供則不顯示 */
  title?: string
}

export function MealCard({ meals, title }: MealCardProps) {
  return (
    <article className="animate-fade-in rounded-2xl border border-line bg-card p-4 shadow-card">
      {title && <h3 className="mb-2 text-sm font-bold tracking-wide text-ink-soft">{title}</h3>}
      <ul className="divide-y divide-line">
        {meals.map((meal) => {
          const Icon = MEAL_ICON[meal.type]
          return (
            <li key={meal.type} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                <Icon size={17} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-ink-soft">{MEAL_LABEL[meal.type]}</p>
                <p className="font-medium text-ink">{meal.content}</p>
              </div>
              {meal.budget && (
                <p className="shrink-0 text-right">
                  <span className="block text-xs text-ink-soft">餐標</span>
                  <span className="font-bold text-aka tabular-nums">{meal.budget}</span>
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </article>
  )
}
