# 東京五日遊｜26JTO08JX1

2026/10/08－10/12 東京五日旅遊行程網站。手機優先、可離線使用的 PWA，不需要登入、沒有後端。

- React + TypeScript（strict）+ Vite + Tailwind CSS + Lucide React
- 行程資料全部打包在前端（`src/data/trip.ts`），不依賴任何 API
- Service Worker 預先快取全部靜態檔，載入過一次後離線也能看

## 開發

```bash
npm install
npm run dev      # 開發伺服器
npm run build    # 型別檢查 + 建置到 dist/
npm run preview  # 預覽建置結果（Service Worker 只在這裡與正式站生效）
```

## 修改行程

只需要修改 `src/data/trip.ts`：

- `trip.days`：每日路線（含距離）、景點、餐食、住宿
- `trip.flights`：航班
- `trip.leader` / `airline` / `sendOff` / `emergency`：聯絡電話
- `trip.meeting`：集合資訊

電話有兩個欄位：`display` 是畫面顯示的原始寫法，`tel` 是實際撥號用的國際格式
（例如顯示 `+81 09043902647`，撥號 `+819043902647`，去掉國碼後的開頭 0 才撥得通）。

沒有的欄位直接省略即可，畫面會自動略過，不會顯示 undefined 或空的電話連結。

## 部署到 Render.com（Static Site）

1. 在 GitHub 建立一個新的 repository
2. 將專案 push 到 GitHub：

   ```bash
   git init
   git add .
   git commit -m "東京五日遊行程網站"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/<repo 名稱>.git
   git push -u origin main
   ```

3. Render → **New** → **Static Site**
4. 選擇剛剛的 GitHub repository
5. Build Command：`npm run build`
6. Publish Directory：`dist`
7. **Deploy**

之後每次 push 到 main，Render 會自動重新部署。

### 關於 SPA rewrite

本專案使用 hash 路由（`/#/itinerary/2`），**不需要**設定 rewrite。
如果日後改用 React Router 的 BrowserRouter，請在 Render 的 Redirects/Rewrites 加上：

| Source | Destination   | Action  |
| ------ | ------------- | ------- |
| `/*`   | `/index.html` | Rewrite |

## PWA 與離線

- `public/manifest.webmanifest`：名稱「東京五日遊」、short_name「東京五日」、standalone 模式
- `public/icons/`：App 圖示（192 / 512 / apple-touch-icon）
- `dist/sw.js`：由 `vite.config.ts` 內的小外掛在建置時產生，會把所有打包檔列入預先快取
  - 採 cache-first：首頁、每日行程、航班、住宿、聯絡電話離線都能開
  - 每次建置會換新的快取版本，使用者下次連上網路後重新開啟就會更新
- 安裝到手機主畫面：
  - iPhone（Safari）：分享 →「加入主畫面」
  - Android（Chrome）：選單 →「安裝應用程式／加到主畫面」
- **出發前請在有網路時先開啟網站一次**，離線快取才會建立
-「開啟地圖」會連到 Google Maps 搜尋（以名稱搜尋、無座標），需要網路；沒有網路不影響閱讀行程

## 替換 Hero 圖片

目前首頁 Hero 使用 CSS 漸層（`src/index.css` 的 `hero-visual`），沒有使用任何圖片。
要換成照片時：

1. 把圖片放到 `public/hero.jpg`（建議寬 1200px、已壓縮）
2. 修改 `src/index.css` 的 `hero-visual`：

   ```css
   background-image:
     linear-gradient(rgb(31 29 26 / 0.55), rgb(31 29 26 / 0.75)), url('/hero.jpg');
   background-size: cover;
   background-position: center;
   ```

放在 `public/` 的檔案會自動被 Service Worker 快取。
社群分享縮圖（`index.html` 的 `og:image`）部署後建議改成完整網址。

## 專案結構

```
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts            # Vite + Tailwind + 產生 sw.js 的外掛
├─ public/
│  ├─ favicon.svg
│  ├─ manifest.webmanifest
│  └─ icons/                 # icon-192 / icon-512 / apple-touch-icon
└─ src/
   ├─ main.tsx               # 進入點、註冊 Service Worker
   ├─ App.tsx                # 版面與頁面切換
   ├─ index.css              # Tailwind 主題（配色、字體、動畫）
   ├─ data/trip.ts           # ★ 所有行程資料與型別
   ├─ lib/
   │  ├─ date.ts             # 今天日期、倒數、旅程狀態
   │  ├─ router.ts           # hash 路由
   │  └─ map.ts              # 地圖搜尋連結
   ├─ components/
   │  ├─ Header / BottomNav / navItems
   │  ├─ DaySelector / DayCard / Timeline
   │  ├─ ActivityCard / Accordion / MapLink
   │  ├─ MealCard / HotelCard / FlightCard
   │  ├─ ContactCard / EmergencyCard / PhoneLink
   │  ├─ MeetingCard / QuickAction / Hero
   │  └─ SectionHeader / PageTitle / StatusBadge
   └─ pages/
      ├─ HomePage / ItineraryPage / FlightsPage
      └─ HotelsPage / ContactPage / MealsPage / InfoPage
```
