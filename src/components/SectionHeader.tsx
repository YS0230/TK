import { ChevronRight } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  eyebrow?: string
  action?: { label: string; href: string }
}

export function SectionHeader({ title, eyebrow, action }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="text-xs font-medium tracking-[0.2em] text-gold-deep uppercase">{eyebrow}</p>
        )}
        <h2 className="text-lg font-bold text-ink">{title}</h2>
      </div>
      {action && (
        <a
          href={action.href}
          className="-mr-2 inline-flex min-h-11 items-center gap-0.5 rounded-lg px-2 text-sm font-medium text-aka"
        >
          {action.label}
          <ChevronRight size={16} aria-hidden="true" />
        </a>
      )}
    </div>
  )
}
