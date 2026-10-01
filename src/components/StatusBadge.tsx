import type { ReactNode } from 'react'

type Tone = 'aka' | 'gold' | 'ink' | 'neutral'

const TONES: Record<Tone, string> = {
  aka: 'bg-aka text-white',
  gold: 'bg-gold-soft text-gold-deep',
  ink: 'bg-ink text-paper',
  neutral: 'bg-paper text-ink-soft border border-line',
}

interface StatusBadgeProps {
  tone?: Tone
  children: ReactNode
}

export function StatusBadge({ tone = 'neutral', children }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}
