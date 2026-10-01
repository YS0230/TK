import { MapPin } from 'lucide-react'
import { mapSearchUrl } from '../lib/map'

interface MapLinkProps {
  query?: string
  name: string
}

/** 以名稱搜尋地圖；沒有搜尋關鍵字就不顯示 */
export function MapLink({ query, name }: MapLinkProps) {
  if (!query) return null

  return (
    <a
      href={mapSearchUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`在地圖開啟 ${name}（需要網路）`}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line bg-card px-4 text-sm font-medium text-ink transition-colors active:bg-paper"
    >
      <MapPin size={16} className="text-aka" aria-hidden="true" />
      開啟地圖
    </a>
  )
}
