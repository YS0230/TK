import type { RouteStop } from '../data/trip'

interface TimelineProps {
  stops: RouteStop[]
}

/** 當日路線：站點 + 站與站之間的距離 */
export function Timeline({ stops }: TimelineProps) {
  return (
    <ol className="relative">
      {stops.map((stop, index) => {
        const isEdge = index === 0 || index === stops.length - 1
        return (
          <li key={`${stop.name}-${index}`} className="relative flex gap-3 pb-3 last:pb-0">
            {index < stops.length - 1 && (
              <span aria-hidden="true" className="absolute top-4 bottom-0 left-[7px] w-px bg-line" />
            )}
            <span
              aria-hidden="true"
              className={`relative mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 ${
                isEdge ? 'border-ink bg-ink' : 'border-aka bg-card'
              }`}
            />
            <div className="min-w-0">
              {stop.distance && (
                <p className="text-xs text-ink-soft tabular-nums">
                  <span className="sr-only">距離上一站</span>
                  {stop.distance}
                </p>
              )}
              <p className="font-medium text-ink">{stop.name}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
