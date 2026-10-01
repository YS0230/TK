import { ContactCard } from '../components/ContactCard'
import { EmergencyCard } from '../components/EmergencyCard'
import { MeetingCard } from '../components/MeetingCard'
import { PageTitle } from '../components/PageTitle'
import { SectionHeader } from '../components/SectionHeader'
import { trip } from '../data/trip'

export function ContactPage() {
  return (
    <div className="space-y-6">
      <PageTitle title="聯絡" subtitle="點擊電話即可直接撥號" />

      <div className="grid gap-4 md:grid-cols-2">
        <ContactCard contact={trip.leader} primary />
        <EmergencyCard contacts={trip.emergency} />
      </div>

      <section aria-label="集合資訊">
        <SectionHeader title="集合資訊" />
        <div className="grid gap-4 md:grid-cols-2">
          <MeetingCard meeting={trip.meeting} />
          <ContactCard contact={trip.airline} />
        </div>
      </section>

      <section aria-label="送機人員">
        <SectionHeader title="送機人員" />
        <div className="grid gap-4 md:grid-cols-2">
          {trip.sendOff.map((contact) => (
            <ContactCard key={contact.name} contact={contact} />
          ))}
        </div>
      </section>
    </div>
  )
}
