import { Info, Repeat } from 'lucide-react'
import type { Activity } from '../data/trip'
import { Accordion } from './Accordion'
import { MapLink } from './MapLink'
import { StatusBadge } from './StatusBadge'

interface ActivityCardProps {
  activity: Activity
  index: number
}

export function ActivityCard({ activity, index }: ActivityCardProps) {
  const { name, type, visit, facts, description, spots, notes, alternative, mapQuery } = activity
  const hasDetail = Boolean(description || spots?.length)

  return (
    <article className="animate-fade-in rounded-2xl border border-line bg-card p-4 shadow-card">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper tabular-nums"
        >
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base leading-snug font-bold text-ink">{name}</h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <StatusBadge tone="gold">{type}</StatusBadge>
            {visit && <StatusBadge>{visit}</StatusBadge>}
          </div>
        </div>
      </div>

      {facts && facts.length > 0 && (
        <dl className="mt-3 space-y-1 text-sm">
          {facts.map((fact) => (
            <div key={fact.label} className="flex gap-2">
              <dt className="shrink-0 text-ink-soft">{fact.label}</dt>
              <dd className="font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {notes?.map((note) => (
        <p key={note} className="mt-3 flex gap-2 rounded-xl bg-aka-soft px-3 py-2 text-sm font-medium text-aka">
          <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            <span className="sr-only">特別提醒：</span>
            {note}
          </span>
        </p>
      ))}

      {alternative && (
        <div className="mt-3 rounded-xl bg-gold-soft px-3 py-2 text-sm text-ink">
          <p className="flex items-center gap-1.5 font-bold text-gold-deep">
            <Repeat size={15} aria-hidden="true" />
            替代方案
          </p>
          <p className="mt-1">{alternative.condition}</p>
          <p className="font-bold">{alternative.name}</p>
          {alternative.mapQuery && (
            <div className="mt-2">
              <MapLink query={alternative.mapQuery} name={alternative.name} />
            </div>
          )}
        </div>
      )}

      {hasDetail && (
        <div className="mt-2 border-t border-line pt-1">
          <Accordion label="查看詳細介紹" openLabel="收合詳細介紹" subject={name}>
            <div className="space-y-3 pb-2 text-sm leading-relaxed text-ink">
              {description && <p>{description}</p>}
              {spots?.map((spot) => (
                <div key={spot.name} className="rounded-xl bg-paper px-3 py-2">
                  <h4 className="font-bold">{spot.name}</h4>
                  <p className="text-ink-soft">{spot.description}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      )}

      {mapQuery && (
        <div className="mt-2">
          <MapLink query={mapQuery} name={name} />
        </div>
      )}
    </article>
  )
}
