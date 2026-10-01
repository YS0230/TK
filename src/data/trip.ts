/**
 * 行程資料集中管理：未來修改行程只需要改這個檔案。
 * 沒有的欄位請直接省略（不要填空字串），畫面會自動略過。
 */

export interface Phone {
  /** 電話用途，例如「國內電話」 */
  label?: string
  /** 畫面顯示的號碼（保留旅行社提供的原始寫法） */
  display: string
  /** 實際撥號用的號碼（國際格式，不含空白），用於 tel: 連結 */
  tel: string
}

export interface Contact {
  role: string
  name: string
  phones: Phone[]
}

export interface Meeting {
  date: string
  time: string
  place: string
  counter: string
  reminder: string
}

export interface Flight {
  direction: 'outbound' | 'return'
  label: string
  flightNo: string
  airline: string
  date: string
  weekday: string
  departTime: string
  departAirport: string
  arriveTime: string
  arriveAirport: string
  duration: string
}

export interface Hotel {
  name: string
  city: string
  /** 入住日 YYYY-MM-DD */
  date: string
  night: number
  address: string[]
  phone?: Phone
  mapQuery?: string
}

export type MealType = 'breakfast' | 'lunch' | 'dinner'

export interface Meal {
  type: MealType
  content: string
  /** 餐標 */
  budget?: string
}

export interface Fact {
  label: string
  value: string
}

export interface SubSpot {
  name: string
  description: string
}

export interface Alternative {
  condition: string
  name: string
  mapQuery?: string
}

export interface Activity {
  id: string
  name: string
  /** 景點類型 */
  type: string
  /** 參觀方式 */
  visit?: string
  facts?: Fact[]
  description?: string
  spots?: SubSpot[]
  /** 特別提醒 */
  notes?: string[]
  alternative?: Alternative
  /** 地圖搜尋關鍵字（只用名稱搜尋，不使用座標） */
  mapQuery?: string
}

export interface RouteStop {
  name: string
  /** 與上一站的距離 */
  distance?: string
}

export interface Day {
  day: number
  /** YYYY-MM-DD */
  date: string
  weekday: string
  /** Day Selector 顯示的區域 */
  title: string
  /** 首頁旅程狀態顯示的區域 */
  statusTitle: string
  theme?: string
  route: RouteStop[]
  highlights: Activity[]
  meals: Meal[]
  hotel?: Hotel
}

export interface Trip {
  name: string
  fullTitle: string
  code: string
  startDate: string
  endDate: string
  dateLabel: string
  tagline: string
  badge: string
  meeting: Meeting
  flights: Flight[]
  days: Day[]
  leader: Contact
  airline: Contact
  sendOff: Contact[]
  emergency: Contact[]
}

export const MEAL_LABEL: Record<MealType, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
}

const hotels = {
  asakusabashi: {
    name: 'HOTEL ROUTE-INN GRAND TOKYO ASAKUSABASHI',
    city: '東京',
    date: '2026-10-08',
    night: 1,
    address: ['〒111-0053', '東京都台東区浅草橋二丁目29番14号'],
    phone: { display: '81-3-5835-1777', tel: '+81358351777' },
    mapQuery: 'HOTEL ROUTE-INN GRAND TOKYO ASAKUSABASHI',
  },
  karuizawa1130: {
    name: 'HOTEL KARUIZAWA 1130',
    city: '嬬戀',
    date: '2026-10-09',
    night: 2,
    address: ['〒377-1402', '群馬県吾妻郡嬬恋村鎌原1453-2'],
    phone: { display: '81-279-866111', tel: '+81279866111' },
    mapQuery: 'HOTEL KARUIZAWA 1130',
  },
  kasugai: {
    name: 'KASUGAI VIEW HOTEL',
    city: '笛吹市／石和溫泉',
    date: '2026-10-10',
    night: 3,
    address: ['406-0015', '笛吹市春日居町鎮目178 JP'],
    phone: { display: '81-55-3263811', tel: '+81553263811' },
    mapQuery: 'KASUGAI VIEW HOTEL',
  },
  hiltonTokyoBay: {
    name: 'HILTON TOKYO BAY',
    city: '浦安市',
    date: '2026-10-11',
    night: 4,
    address: ['〒279-0031', '千葉県浦安市舞浜1-8'],
    phone: { display: '81-47-355-5000', tel: '+81473555000' },
    mapQuery: 'HILTON TOKYO BAY',
  },
} satisfies Record<string, Hotel>

export const trip: Trip = {
  name: '東京五日遊',
  fullTitle: '省最大東京｜東京鐵塔・輕井澤散策・川越老街・小諸城・忍者八海・螃蟹美食雙溫泉五日',
  code: '26JTO08JX1',
  startDate: '2026-10-08',
  endDate: '2026-10-12',
  dateLabel: '2026/10/08（四）～ 2026/10/12（一）',
  tagline: '東京鐵塔・川越・嚕嚕米・輕井澤・小諸城・富士山・忍者八海・台場',
  badge: '保住1晚希爾頓飯店',

  meeting: {
    date: '10/08',
    time: '06:00',
    place: '桃園機場 第一航廈',
    counter: '星宇5號櫃台',
    reminder: '請提早抵達機場。',
  },

  flights: [
    {
      direction: 'outbound',
      label: '去程',
      flightNo: 'JX800',
      airline: '星宇航空',
      date: '2026-10-08',
      weekday: '四',
      departTime: '08:30',
      departAirport: '桃園機場',
      arriveTime: '12:55',
      arriveAirport: '東京成田機場',
      duration: '03:25',
    },
    {
      direction: 'return',
      label: '回程',
      flightNo: 'JX803',
      airline: '星宇航空',
      date: '2026-10-12',
      weekday: '一',
      departTime: '16:20',
      departAirport: '東京成田機場',
      arriveTime: '19:00',
      arriveAirport: '桃園機場',
      duration: '03:40',
    },
  ],

  days: [
    {
      day: 1,
      date: '2026-10-08',
      weekday: '四',
      title: '東京',
      statusTitle: '東京',
      theme: '日本經典城市地標',
      route: [
        { name: '台灣桃園國際機場' },
        { name: '東京成田國際空港' },
        { name: '東京鐵塔', distance: '約75 km' },
        { name: '飯店' },
      ],
      highlights: [
        {
          id: 'tokyo-tower',
          name: '東京鐵塔',
          type: '城市地標',
          visit: '下車參觀',
          description:
            '日本東京鐵塔的外觀設計是以法國艾菲爾鐵塔為雛型，但卻有著較艾菲爾鐵塔高聳的外觀與輕巧的骨架，其塔底至塔尖總長為333公尺，主要是作為類比、數位訊號發送的電塔，並兼具風向、溫度測量與緊急訊號發送之功能，另外也結合觀光，於塔底規劃有5層的「Foot Town」，而在高145公尺與250公尺處亦分別設置有大展望台和特別展望台。',
          notes: ['本行程不上展望台。'],
          mapQuery: '東京鐵塔',
        },
      ],
      meals: [
        { type: 'breakfast', content: '溫暖的家' },
        { type: 'lunch', content: '機上簡餐' },
        { type: 'dinner', content: '日式壽喜燒風味鍋物吃到飽', budget: '¥3,500' },
      ],
      hotel: hotels.asakusabashi,
    },
    {
      day: 2,
      date: '2026-10-09',
      weekday: '五',
      title: '川越・嚕嚕米・群馬',
      statusTitle: '川越・嚕嚕米・群馬',
      theme: '三景一旅，體驗日本的雅、童、味',
      route: [
        { name: '飯店' },
        { name: '六義園', distance: '約6 km' },
        { name: '川越藏造一番街', distance: '約50 km' },
        { name: '時代之鐘' },
        { name: '菓子屋橫丁' },
        { name: '嚕嚕米森林公園', distance: '約18 km' },
        { name: '群馬溫泉鄉', distance: '約152 km' },
      ],
      highlights: [
        {
          id: 'rikugien',
          name: '六義園',
          type: '日式庭園',
          visit: '入內參觀',
          description:
            '六義園是由柳澤吉保於元祿15年（公元1702年）修建的，是以和歌的趣味為基調的「回游式築山泉水」大名庭園，也是江戶時代大名庭園的代表。',
          mapQuery: '六義園',
        },
        {
          id: 'kawagoe',
          name: '川越藏造一番街',
          type: '歷史老街',
          facts: [{ label: '包含', value: '時代之鐘、菓子屋橫丁' }],
          description:
            '川越位於埼玉縣，有「小江戶」之稱，市區保留許多江戶時代的歷史街道與寺院，並以黑磚瓦藏屋聞名。',
          spots: [
            { name: '時代之鐘', description: '每天固定：06:00、12:00、15:00、18:00' },
            {
              name: '菓子屋橫丁',
              description: '約80公尺長的傳統小巷，聚集粗點心、丸子、煎餅與懷舊童玩。',
            },
          ],
          mapQuery: '川越 蔵造りの町並み 一番街',
        },
        {
          id: 'moomin',
          name: '嚕嚕米森林公園',
          type: '主題樂園',
          facts: [
            { label: '位置', value: '埼玉縣飯能市宮澤湖一帶' },
            { label: '主題', value: 'Moomin Valley' },
          ],
          description: '以芬蘭作家朵貝・楊笙筆下的姆明一族為主題的森林樂園。',
          mapQuery: 'Moominvalley Park 飯能',
        },
      ],
      meals: [
        { type: 'breakfast', content: '飯店內早餐' },
        { type: 'lunch', content: '日式燒肉風味料理', budget: '¥2,500' },
        { type: 'dinner', content: '飯店內「信越地元風味自助餐」' },
      ],
      hotel: hotels.karuizawa1130,
    },
    {
      day: 3,
      date: '2026-10-10',
      weekday: '六',
      title: '輕井澤・小諸・石和',
      statusTitle: '輕井澤・小諸・石和',
      theme: '輕井澤悠活散策，體驗日本人度假態度',
      route: [
        { name: '飯店' },
        { name: '雲場池', distance: '約23 km' },
        { name: '舊輕井澤銀座大道', distance: '約2 km' },
        { name: '聖保羅教堂' },
        { name: '小諸城址・懷古園', distance: '約24 km' },
        { name: '石和溫泉', distance: '約118 km' },
      ],
      highlights: [
        {
          id: 'kumoba',
          name: '雲場池',
          type: '自然景觀',
          visit: '下車參觀',
          facts: [{ label: '別名', value: '天鵝池' }],
          description:
            '雲場池佔地約2000坪，池水清澈，四季有不同景色，秋季可欣賞紅葉倒映，夏季則有翠綠林木。',
          alternative: {
            condition: '若遇休園日、設施維修或交通不便等因素無法前往，改前往：',
            name: '輕井澤白絲瀑布',
            mapQuery: '軽井沢 白糸の滝',
          },
          mapQuery: '雲場池 軽井沢',
        },
        {
          id: 'karuizawa-ginza',
          name: '舊輕井澤銀座大道',
          type: '商店街',
          visit: '自由活動',
          description: '約600公尺的街道，林蔭、歐式建築、商店、甜點與伴手禮集中於此。',
          mapQuery: '旧軽井沢銀座通り',
        },
        {
          id: 'st-paul',
          name: '輕井澤聖保羅教堂',
          type: '教堂建築',
          visit: '下車參觀',
          description: '由美國建築家 Antonin Raymond 設計，以歐洲鄉間教堂風格為特色。',
          mapQuery: '軽井沢聖パウロカトリック教会',
        },
        {
          id: 'komoro',
          name: '小諸城遺址・懷古園',
          type: '城址公園',
          visit: '下車參觀',
          facts: [{ label: '別名', value: '白鶴城、醉月城' }],
          description: '位於長野縣小諸市，可欣賞四季景色，春季賞櫻尤其著名。',
          mapQuery: '小諸城址 懐古園',
        },
      ],
      meals: [
        { type: 'breakfast', content: '飯店內早餐' },
        { type: 'lunch', content: '日式風味御膳料理', budget: '¥2,500' },
        { type: 'dinner', content: '70分鐘長腳蟹吃到飽＋和洋地元風味自助餐' },
      ],
      hotel: hotels.kasugai,
    },
    {
      day: 4,
      date: '2026-10-11',
      weekday: '日',
      title: '富士山・忍者八海・台場',
      statusTitle: '河口湖・忍者八海・台場',
      theme: '精選以富士山為背景打卡名點',
      route: [
        { name: '飯店' },
        { name: '大石公園', distance: '約28 km' },
        { name: '忍者八海', distance: '約15 km' },
        { name: '光伸免稅店', distance: '約131 km' },
        { name: '台場 DiverCity Tokyo Plaza', distance: '約5 km' },
        { name: 'Hilton Tokyo Bay', distance: '約15 km' },
      ],
      highlights: [
        {
          id: 'oishi-park',
          name: '大石公園',
          type: '公園・湖景',
          visit: '下車參觀',
          description: '位於河口湖北岸，可以欣賞富士山與河口湖景色。不同季節有不同花卉景觀。',
          mapQuery: '大石公園 河口湖',
        },
        {
          id: 'oshino-hakkai',
          name: '忍者八海',
          type: '湧泉・自然景觀',
          visit: '下車參觀',
          facts: [{ label: '特色', value: '日本百選名水、國家天然紀念物' }],
          mapQuery: '忍野八海',
        },
        {
          id: 'duty-free',
          name: '光伸免稅店',
          type: '免稅店',
          visit: '入內參觀',
          facts: [{ label: '停留', value: '約1小時' }],
        },
        {
          id: 'divercity',
          name: '台場 DiverCity Tokyo Plaza',
          type: '購物商場',
          visit: '下車參觀',
          facts: [{ label: '位置', value: '台場' }],
          description: '東京臨海副都心的大型購物商場，集合國際品牌、日本品牌、休閒品牌與餐飲。',
          mapQuery: '台場 DiverCity Tokyo Plaza',
        },
      ],
      meals: [
        { type: 'breakfast', content: '飯店內簡易早餐' },
        { type: 'lunch', content: '山梨風味陶板燒御膳', budget: '¥2,500' },
        { type: 'dinner', content: '方便遊玩，敬請自理' },
      ],
      hotel: hotels.hiltonTokyoBay,
    },
    {
      day: 5,
      date: '2026-10-12',
      weekday: '一',
      title: '東京 → 台灣',
      statusTitle: '東京 → 台灣',
      route: [
        { name: '飯店' },
        { name: '東京成田國際空港', distance: '約67 km' },
        { name: '台灣桃園國際機場' },
      ],
      highlights: [],
      meals: [
        { type: 'breakfast', content: '飯店內早餐' },
        { type: 'lunch', content: '機上精緻簡餐' },
        { type: 'dinner', content: '溫暖的家' },
      ],
    },
  ],

  leader: {
    role: '領隊',
    name: '黃敍銘 先生',
    phones: [
      { label: '國內電話', display: '+886 0982964799', tel: '+886982964799' },
      { label: '國外電話', display: '+81 09043902647', tel: '+819043902647' },
    ],
  },

  airline: {
    role: '航空公司',
    name: '星宇航空',
    phones: [{ display: '(886 2) 2791-1199', tel: '+886227911199' }],
  },

  sendOff: [
    {
      role: '送機人員',
      name: '台灣桃園國際機場第一航廈',
      phones: [{ display: '0921-809-206', tel: '+886921809206' }],
    },
    {
      role: '送機人員',
      name: '台灣桃園國際機場第二航廈',
      phones: [{ display: '0921-809-207', tel: '+886921809207' }],
    },
  ],

  emergency: [
    {
      role: '緊急調度',
      name: '桃園／松山機場',
      phones: [{ display: '0932-365-795', tel: '+886932365795' }],
    },
  ],
}

export const tripHotels: Hotel[] = trip.days.flatMap((day) => (day.hotel ? [day.hotel] : []))
