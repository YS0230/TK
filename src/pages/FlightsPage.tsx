import { ContactCard } from '../components/ContactCard'
import { FlightCard } from '../components/FlightCard'
import { PageTitle } from '../components/PageTitle'
import { trip } from '../data/trip'

export function FlightsPage() {
  return (
    <div className="space-y-4">
      <PageTitle title="航班" subtitle={trip.airline.name} />
      <div className="grid gap-4 md:grid-cols-2">
        {trip.flights.map((flight) => (
          <FlightCard key={flight.flightNo} flight={flight} />
        ))}
      </div>
      <div className="md:max-w-md">
        <ContactCard contact={trip.airline} />
      </div>
    </div>
  )
}
