import type { Trip } from '../data/trip'
import type { TripStatus } from '../lib/date'

interface HeroProps {
  trip: Trip
  status: TripStatus
}

function StatusBlock({ status }: { status: TripStatus }) {
  if (status.phase === 'before') {
    return (
      <p className="flex items-end gap-2">
        <span className="pb-1.5 text-sm text-paper/80">距離出發</span>
        <span className="text-5xl leading-none font-bold text-white tabular-nums">{status.daysLeft}</span>
        <span className="pb-1.5 text-sm text-paper/80">天</span>
      </p>
    )
  }
  if (status.phase === 'during') {
    return (
      <p>
        <span className="block text-sm text-paper/80">旅程進行中</span>
        <span className="text-2xl leading-tight font-bold text-white">
          Day {status.day.day}｜{status.day.statusTitle}
        </span>
      </p>
    )
  }
  return <p className="text-2xl font-bold text-white">旅程已結束</p>
}

export function Hero({ trip, status }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="hero-visual rounded-3xl p-5 text-paper shadow-card md:p-8">
      <p className="text-xs font-medium tracking-[0.25em] text-gold tabular-nums">{trip.code}</p>
      <h1 id="hero-title" className="mt-1 text-3xl font-bold tracking-wide text-white md:text-4xl">
        {trip.name}
      </h1>
      <p className="mt-1 text-sm text-paper/90 tabular-nums">{trip.dateLabel}</p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/80">「{trip.tagline}」</p>
      <p className="mt-3 inline-block rounded-full border border-gold/70 px-3 py-0.5 text-xs font-medium text-gold">
        {trip.badge}
      </p>
      <div className="mt-4 border-t border-paper/15 pt-4" role="status">
        <StatusBlock status={status} />
      </div>
    </section>
  )
}
