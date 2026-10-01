import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionProps {
  /** 收合時的按鈕文字 */
  label: string
  /** 展開後的按鈕文字 */
  openLabel?: string
  /** 補充說明給螢幕報讀器，例如景點名稱 */
  subject?: string
  defaultOpen?: boolean
  children: ReactNode
}

export function Accordion({ label, openLabel, subject, defaultOpen = false, children }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const text = open ? (openLabel ?? label) : label

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={subject ? `${text}：${subject}` : text}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 w-full items-center justify-between gap-2 rounded-lg text-left text-sm font-medium text-aka"
      >
        {text}
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden" hidden={!open}>
          {children}
        </div>
      </div>
    </div>
  )
}
