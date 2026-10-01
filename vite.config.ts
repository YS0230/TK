import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** 遞迴列出 public/ 內的檔案（轉成網站根目錄路徑） */
function listPublicFiles(dir: string, base = ''): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    const url = `${base}/${name}`
    return statSync(full).isDirectory() ? listPublicFiles(full, url) : [url]
  })
}

/**
 * 建置時產生 sw.js：把所有打包後的靜態資源列入 precache，
 * 讓網站載入過一次後，離線也能開啟全部頁面。
 */
function tripServiceWorker(): Plugin {
  return {
    name: 'trip-service-worker',
    apply: 'build',
    generateBundle(_options, bundle) {
      const bundled = Object.keys(bundle)
        .filter((file) => !file.endsWith('.map'))
        .map((file) => `/${file}`)
      const precache = Array.from(
        new Set(['/', '/index.html', ...bundled, ...listPublicFiles('public')]),
      )
      const source = `const CACHE = 'trip-${Date.now()}'
const PRECACHE = ${JSON.stringify(precache, null, 2)}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Cache first：行程資料全部打包在靜態檔內，網路不穩時直接讀快取
  const cacheKey = request.mode === 'navigate' ? '/index.html' : request
  event.respondWith(
    caches.match(cacheKey).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          }
          return response
        }),
    ),
  )
})
`
      this.emitFile({ type: 'asset', fileName: 'sw.js', source })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), tripServiceWorker()],
})
