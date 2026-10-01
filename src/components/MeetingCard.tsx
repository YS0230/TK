import { BellRing } from 'lucide-react'
import type { Meeting } from '../data/trip'

interface MeetingCardProps {
  meeting: Meeting
}

/** 重要提醒：出發集合資訊 */
export function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="animate-fade-in rounded-2xl border border-gold/60 bg-gold-soft p-4">
      <h3 className="flex items-center gap-2 text-sm font-bold text-gold-deep">
        <BellRing size={16} aria-hidden="true" />
        重要提醒｜出發集合
      </h3>
      <p className="mt-2 text-3xl font-bold text-ink tabular-nums">
        {meeting.date} <span className="text-aka">{meeting.time}</span>
      </p>
      <p className="mt-1 font-bold text-ink">{meeting.place}</p>
      <p className="font-bold text-ink">{meeting.counter}</p>
      <p className="mt-2 text-sm text-ink-soft">{meeting.reminder}</p>
    </article>
  )
}
