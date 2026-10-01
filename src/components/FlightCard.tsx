import { Plane, PlaneLanding, PlaneTakeoff } from 'lucide-react'
import type { Flight } from '../data/trip'
import { StatusBadge } from './StatusBadge'

interface FlightCardProps {
  flight: Flight
}

export function FlightCard({ flight }: FlightCardProps) {
  const outbound = flight.direction === 'outbound'
  const DirectionIcon = outbound ? PlaneTakeoff : PlaneLanding

  return (
    <article className="animate-fade-in overflow-hidden rounded-2xl border border-line bg-card shadow-card">
      <div
        className={`flex items-center justify-between gap-2 px-4 py-2.5 ${outbound ? 'bg-aka text-white' : 'bg-ink text-paper'}`}
      >
        <h3 className="flex items-center gap-2 text-base font-bold">
          <DirectionIcon size={18} aria-hidden="true" />
          {flight.label}
        </h3>
        <p className="text-sm tabular-nums">
          {flight.date.replaceAll('-', '/')}（{flight.weekday}）
        </p>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-2xl font-bold tracking-wide text-ink tabular-nums">{flight.flightNo}</p>
          <StatusBadge tone="gold">{flight.airline}</StatusBadge>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div>
            <p className="text-xs text-ink-soft">出發</p>
            <p className="text-3xl font-bold text-ink tabular-nums">{flight.departTime}</p>
            <p className="text-sm font-medium text-ink">{flight.departAirport}</p>
          </div>
          <div className="flex flex-col items-center px-1 text-ink-soft">
            <Plane size={20} className="rotate-45 text-aka" aria-hidden="true" />
            <p className="mt-1 text-xs whitespace-nowrap">飛行時間</p>
            <p className="text-sm font-bold text-ink tabular-nums">{flight.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-ink-soft">抵達</p>
            <p className="text-3xl font-bold text-ink tabular-nums">{flight.arriveTime}</p>
            <p className="text-sm font-medium text-ink">{flight.arriveAirport}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
