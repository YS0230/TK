/** 以名稱建立 Google Maps 搜尋連結（不使用座標） */
export function mapSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
