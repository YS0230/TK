import { HotelCard } from '../components/HotelCard'
import { PageTitle } from '../components/PageTitle'
import { tripHotels } from '../data/trip'

interface HotelsPageProps {
  today: string
}

export function HotelsPage({ today }: HotelsPageProps) {
  return (
    <div className="space-y-4">
      <PageTitle title="住宿" subtitle={`共 ${tripHotels.length} 晚`} />
      <ol className="grid gap-4 md:grid-cols-2">
        {tripHotels.map((hotel) => (
          <li key={hotel.name}>
            <HotelCard hotel={hotel} tonight={hotel.date === today} />
          </li>
        ))}
      </ol>
    </div>
  )
}
