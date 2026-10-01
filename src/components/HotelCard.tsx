import { BedDouble } from 'lucide-react'
import type { Hotel } from '../data/trip'
import { shortDate } from '../lib/date'
import { MapLink } from './MapLink'
import { PhoneLink } from './PhoneLink'
import { StatusBadge } from './StatusBadge'

interface HotelCardProps {
  hotel: Hotel
  /** 是否為今晚入住的飯店 */
  tonight?: boolean
}

export function HotelCard({ hotel, tonight = false }: HotelCardProps) {
  return (
    <article
      className={`animate-fade-in rounded-2xl border bg-card p-4 shadow-card ${tonight ? 'border-aka' : 'border-line'}`}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <StatusBadge tone="ink">第 {hotel.night} 晚</StatusBadge>
        <StatusBadge>{shortDate(hotel.date)}</StatusBadge>
        <StatusBadge tone="gold">{hotel.city}</StatusBadge>
        {tonight && <StatusBadge tone="aka">今晚</StatusBadge>}
      </div>

      <h3 className="mt-3 flex items-start gap-2 text-base leading-snug font-bold text-ink">
        <BedDouble size={20} className="mt-0.5 shrink-0 text-aka" aria-hidden="true" />
        {hotel.name}
      </h3>

      <address className="mt-2 text-sm text-ink-soft not-italic">
        {hotel.address.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>

      <div className="mt-3 space-y-2">
        {hotel.phone && (
          <>
            <p className="text-sm text-ink-soft">
              電話 <span className="font-medium text-ink tabular-nums">{hotel.phone.display}</span>
            </p>
            <PhoneLink phone={hotel.phone} owner={hotel.name} text="撥打飯店電話" variant="solid" />
          </>
        )}
        <MapLink query={hotel.mapQuery} name={hotel.name} />
      </div>
    </article>
  )
}
