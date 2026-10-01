import type { LucideIcon } from 'lucide-react'

interface QuickActionProps {
  icon: LucideIcon
  label: string
  /** 補充資訊，例如今晚飯店所在城市 */
  hint?: string
  href?: string
  onClick?: () => void
}

const CLASS_NAME =
  'flex min-h-20 w-full flex-col items-center justify-center gap-1 rounded-2xl border border-line bg-card px-1 py-3 text-center shadow-card transition-transform active:scale-[0.97]'

export function QuickAction({ icon: Icon, label, hint, href, onClick }: QuickActionProps) {
  const content = (
    <>
      <Icon size={24} className="text-aka" aria-hidden="true" />
      <span className="text-[13px] font-bold whitespace-nowrap text-ink sm:text-sm">{label}</span>
      {hint && <span className="text-xs leading-tight text-ink-soft">{hint}</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} className={CLASS_NAME}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={CLASS_NAME}>
      {content}
    </button>
  )
}
