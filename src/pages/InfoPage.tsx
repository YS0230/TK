import { DayCard } from '../components/DayCard'
import { MeetingCard } from '../components/MeetingCard'
import { PageTitle } from '../components/PageTitle'
import { SectionHeader } from '../components/SectionHeader'
import { StatusBadge } from '../components/StatusBadge'
import { trip } from '../data/trip'

interface InfoPageProps {
  todayDay?: number
}

export function InfoPage({ todayDay }: InfoPageProps) {
  const facts = [
    { label: '團號', value: trip.code },
    { label: '日期', value: trip.dateLabel },
    { label: '領隊', value: trip.leader.name },
    { label: '航空公司', value: trip.airline.name },
  ]

  return (
    <div className="space-y-6">
      <PageTitle title="旅行資訊" />

      <article className="rounded-2xl border border-line bg-card p-4 shadow-card">
        <h2 className="text-base leading-relaxed font-bold text-ink">{trip.fullTitle}</h2>
        <div className="mt-2">
          <StatusBadge tone="gold">{trip.badge}</StatusBadge>
        </div>
        <dl className="mt-4 divide-y divide-line text-sm">
          {facts.map((fact) => (
            <div key={fact.label} className="flex justify-between gap-4 py-2.5 last:pb-0">
              <dt className="shrink-0 text-ink-soft">{fact.label}</dt>
              <dd className="text-right font-medium text-ink tabular-nums">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </article>

      <div className="md:max-w-md">
        <MeetingCard meeting={trip.meeting} />
      </div>

      <section aria-label="行程總覽">
        <SectionHeader title="行程總覽" />
        <div className="grid gap-4 md:grid-cols-2">
          {trip.days.map((day) => (
            <DayCard key={day.day} day={day} isToday={day.day === todayDay} showLink />
          ))}
        </div>
      </section>
    </div>
  )
}
