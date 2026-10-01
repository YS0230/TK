import type { Contact } from '../data/trip'
import { PhoneLink } from './PhoneLink'

interface ContactCardProps {
  contact: Contact
  /** 主要聯絡人使用實心撥號按鈕 */
  primary?: boolean
}

export function ContactCard({ contact, primary = false }: ContactCardProps) {
  return (
    <article className="animate-fade-in rounded-2xl border border-line bg-card p-4 shadow-card">
      <p className="text-xs font-medium tracking-widest text-gold-deep">{contact.role}</p>
      <h3 className="text-lg font-bold text-ink">{contact.name}</h3>
      <div className="mt-3 space-y-2">
        {contact.phones.map((phone) => (
          <PhoneLink
            key={phone.tel}
            phone={phone}
            owner={`${contact.role} ${contact.name}`}
            variant={primary ? 'solid' : 'outline'}
          />
        ))}
      </div>
    </article>
  )
}
