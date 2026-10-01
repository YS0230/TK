import { Phone as PhoneIcon } from 'lucide-react'
import type { Phone } from '../data/trip'

interface PhoneLinkProps {
  phone: Phone
  /** 給螢幕報讀器的對象名稱，例如「領隊 黃敍銘 先生」 */
  owner: string
  /** 按鈕文字；未提供時顯示號碼 */
  text?: string
  variant?: 'solid' | 'outline'
}

const VARIANTS = {
  solid: 'bg-ink text-paper active:bg-ink/85',
  outline: 'border border-line bg-card text-ink active:bg-paper',
}

export function PhoneLink({ phone, owner, text, variant = 'outline' }: PhoneLinkProps) {
  // 沒有號碼時不產生空的 tel 連結
  if (!phone.tel) return null

  return (
    <a
      href={`tel:${phone.tel}`}
      aria-label={`撥打${owner}${phone.label ?? ''} ${phone.display}`}
      className={`flex min-h-12 items-center justify-between gap-3 rounded-xl px-4 py-2 transition-colors ${VARIANTS[variant]}`}
    >
      <span className="min-w-0">
        {phone.label && <span className="block text-xs opacity-70">{phone.label}</span>}
        <span className="block font-semibold tabular-nums break-all">{text ?? phone.display}</span>
      </span>
      <PhoneIcon size={18} className="shrink-0" aria-hidden="true" />
    </a>
  )
}
