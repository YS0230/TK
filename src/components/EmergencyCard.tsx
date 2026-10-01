import { LifeBuoy } from 'lucide-react'
import type { Contact } from '../data/trip'
import { PhoneLink } from './PhoneLink'

interface EmergencyCardProps {
  contacts: Contact[]
}

export function EmergencyCard({ contacts }: EmergencyCardProps) {
  return (
    <section
      id="emergency"
      aria-labelledby="emergency-title"
      className="scroll-mt-20 rounded-2xl border border-aka/40 bg-aka-soft p-4"
    >
      <h2 id="emergency-title" className="flex items-center gap-2 text-lg font-bold text-aka">
        <LifeBuoy size={20} aria-hidden="true" />
        緊急聯絡
      </h2>
      <ul className="mt-3 space-y-3">
        {contacts.map((contact) => (
          <li key={`${contact.role}-${contact.name}`}>
            <p className="mb-1.5 text-sm text-ink">
              <span className="font-bold">{contact.role}</span>
              <span className="text-ink-soft">｜{contact.name}</span>
            </p>
            <div className="space-y-2">
              {contact.phones.map((phone) => (
                <PhoneLink key={phone.tel} phone={phone} owner={`${contact.role} ${contact.name}`} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
