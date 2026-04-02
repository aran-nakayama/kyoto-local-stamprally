import { Locale } from "./types";

export interface ShopTranslation {
  name: string;
  description: string;
  address: string;
  closedDays: string;
}

type ShopTranslationMap = Record<string, Partial<Record<Locale, Partial<ShopTranslation>>>>;

export const defaultShopTranslations: ShopTranslationMap = {
  "shop-001": {
    en: { name: "Kissaten Madrague", description: "A cafe renovated from a 100-year-old machiya townhouse. Famous for their thick egg sandwich.", address: "Nakagyo-ku, Kyoto", closedDays: "Wednesday" },
    zh: { name: "喫茶マドラグ", description: "由百年町屋改建的咖啡馆。招牌厚蛋三明治令人难忘。", address: "京都市中京区", closedDays: "周三" },
    ko: { name: "킷사텐 마드라그", description: "100년 된 마치야를 개조한 카페. 두꺼운 계란 샌드위치가 명물.", address: "교토시 나카교구", closedDays: "수요일" },
  },
  "shop-002": {
    en: { name: "Sarasa Nishijin", description: "A cafe renovated from a former public bathhouse. Beautiful tiled walls create a unique open atmosphere.", address: "Kita-ku, Kyoto", closedDays: "Wednesday" },
    zh: { name: "さらさ西陣", description: "由旧澡堂改建的咖啡馆。美丽的瓷砖墙壁营造出独特的开放空间。", address: "京都市北区", closedDays: "周三" },
    ko: { name: "사라사 니시진", description: "옛 목욕탕을 리노베이션한 카페. 타일 벽이 아름답고 독특한 개방감.", address: "교토시 기타구", closedDays: "수요일" },
  },
  "shop-003": {
    en: { name: "Elephant Factory Coffee", description: "A hidden roastery in an alley. Carefully roasted single-origin beans.", address: "Kawaramachi area, Kyoto", closedDays: "Tuesday" },
    zh: { name: "Elephant Factory Coffee", description: "隐藏在小巷中的烘焙咖啡店。精心烘焙的单品咖啡豆。", address: "京都市河原町附近", closedDays: "周二" },
    ko: { name: "엘리펀트 팩토리 커피", description: "골목 안에 숨겨진 로스터리. 정성껏 로스팅한 싱글 오리진 원두.", address: "교토시 가와라마치 부근", closedDays: "화요일" },
  },
  "shop-004": {
    en: { name: "Bar Kohaku", description: "An authentic bar in the Kiyamachi district. Exquisite cocktails made by skilled bartenders.", address: "Kiyamachi, Kyoto", closedDays: "Sunday" },
    zh: { name: "Bar 琥珀", description: "木屋町的正统酒吧。资深调酒师调制的精美鸡尾酒。", address: "京都市木屋町", closedDays: "周日" },
    ko: { name: "바 코하쿠", description: "기야마치의 정통 바. 숙련된 바텐더가 만드는 정교한 칵테일.", address: "교토시 기야마치", closedDays: "일요일" },
  },
  "shop-005": {
    en: { name: "Bar Rocking Chair", description: "A jazz bar with live performances. Enjoy quality whisky with music.", address: "Sanjo area, Kyoto", closedDays: "Monday" },
    zh: { name: "Bar Rocking Chair", description: "有现场演奏的爵士酒吧。在音乐中品味优质威士忌。", address: "京都市三条附近", closedDays: "周一" },
    ko: { name: "바 로킹 체어", description: "라이브 공연이 있는 재즈 바. 음악과 함께 위스키를 즐기세요.", address: "교토시 산조 부근", closedDays: "월요일" },
  },
  "shop-006": {
    en: { name: "Menya Inoichi", description: "A Michelin-recognized ramen shop. Clear soy sauce broth with refined flavor.", address: "Kawaramachi, Kyoto", closedDays: "Wednesday" },
    zh: { name: "�的屋 猪一", description: "米其林认证的拉面店。清澈的酱油汤底，味道精致。", address: "京都市河原町", closedDays: "周三" },
    ko: { name: "멘야 이노이치", description: "미슐랭 인정 라멘 가게. 깔끔한 간장 국물의 세련된 맛.", address: "교토시 가와라마치", closedDays: "수요일" },
  },
  "shop-007": {
    en: { name: "Demachi Futaba", description: "A long-established wagashi shop since 1899. Famous for their mame-mochi (bean rice cake).", address: "Demachi, Kyoto", closedDays: "Tuesday, 4th Wed" },
    zh: { name: "出町ふたば", description: "创业于1899年的老字号和果子店。招牌豆饼远近闻名。", address: "京都市出町", closedDays: "周二、第四个周三" },
    ko: { name: "데마치 후타바", description: "1899년 창업 노포 화과자점. 명물 마메모치는 꼭 먹어봐야 할 맛.", address: "교토시 데마치", closedDays: "화요일, 넷째 수요일" },
  },
  "shop-008": {
    en: { name: "Rokuyosha Underground", description: "An underground kissaten since 1950. Hand-drip coffee with rich aroma.", address: "Kawaramachi, Kyoto", closedDays: "Wednesday" },
    zh: { name: "六曜社地下店", description: "1950年开业的地下咖啡馆。手冲咖啡香气浓郁。", address: "京都市河原町", closedDays: "周三" },
    ko: { name: "로쿠요샤 지하점", description: "1950년부터 이어온 지하 킷사텐. 핸드드립 커피의 깊은 향.", address: "교토시 가와라마치", closedDays: "수요일" },
  },
  "shop-009": {
    en: { name: "Ace Hotel Kyoto Lobby Bar", description: "A stylish hotel lobby bar fusing Kyoto culture with Portland design.", address: "Karasuma area, Kyoto", closedDays: "None" },
    zh: { name: "Ace Hotel Kyoto 大堂酒吧", description: "融合京都文化与波特兰设计的时尚酒店大堂酒吧。", address: "京都市乌丸附近", closedDays: "无" },
    ko: { name: "에이스 호텔 교토 로비바", description: "교토 문화와 포틀랜드 디자인이 어우러진 세련된 호텔 로비 바.", address: "교토시 가라스마 부근", closedDays: "없음" },
  },
  "shop-010": {
    en: { name: "Teuchi Udon Tanaka", description: "Handmade udon with firm texture. Simple yet deeply flavorful dashi broth.", address: "Nishiki area, Kyoto", closedDays: "Sunday" },
    zh: { name: "手打ちうどん たなか", description: "口感劲道的手工乌冬面。简单却层次丰富的高汤。", address: "京都市锦附近", closedDays: "周日" },
    ko: { name: "테우치 우동 타나카", description: "쫄깃한 수제 우동. 심플하지만 깊은 맛의 다시 국물.", address: "교토시 니시키 부근", closedDays: "일요일" },
  },
  "shop-011": {
    en: { name: "Cafe Marble Bukkoji", description: "A machiya cafe on Bukkoji street. Seasonal pancakes are a must-try.", address: "Bukkoji, Kyoto", closedDays: "Irregular" },
    zh: { name: "café marble 佛光寺", description: "佛光寺通的町屋咖啡馆。季节限定松饼是必点。", address: "京都市佛光寺", closedDays: "不定休" },
    ko: { name: "카페 마블 붓코지", description: "붓코지도리의 마치야 카페. 계절 한정 팬케이크가 인기.", address: "교토시 붓코지", closedDays: "비정기 휴무" },
  },
  "shop-012": {
    en: { name: "Sakaba I", description: "A standing bar with excellent sake selection. Perfectly paired small dishes.", address: "Pontocho area, Kyoto", closedDays: "Sunday" },
    zh: { name: "酒场 井", description: "日本酒品类丰富的立饮酒场。搭配完美的小菜。", address: "京都市先斗町附近", closedDays: "周日" },
    ko: { name: "사카바 이", description: "일본주 셀렉션이 뛰어난 스탠딩 바. 안주 페어링이 완벽.", address: "교토시 폰토초 부근", closedDays: "일요일" },
  },
  "shop-013": {
    en: { name: "Kitchen Gorilla", description: "A local favorite yoshoku restaurant. Generous portions of hearty Western-Japanese cuisine.", address: "Marutamachi, Kyoto", closedDays: "Thursday" },
    zh: { name: "キッチンごりら", description: "当地人喜爱的洋食店。分量十足的美味西式日餐。", address: "京都市丸太町", closedDays: "周四" },
    ko: { name: "키친 고릴라", description: "현지인이 사랑하는 요쇼쿠 레스토랑. 푸짐한 양식의 든든한 한 끼.", address: "교토시 마루타마치", closedDays: "목요일" },
  },
  "shop-014": {
    en: { name: "Weekenders Coffee", description: "A specialty coffee stand. Award-winning latte art and carefully sourced beans.", address: "Tominokoji, Kyoto", closedDays: "Monday" },
    zh: { name: "Weekenders Coffee", description: "精品咖啡站。获奖拿铁拉花和精心挑选的咖啡豆。", address: "京都市富小路", closedDays: "周一" },
    ko: { name: "위켄더스 커피", description: "스페셜티 커피 스탠드. 수상 경력의 라떼아트와 엄선된 원두.", address: "교토시 토미노코지", closedDays: "월요일" },
  },
  "shop-015": {
    en: { name: "Kyogoku Stand", description: "A retro food stand in the Shinkyogoku shopping area. Affordable and tasty classic dishes.", address: "Shinkyogoku, Kyoto", closedDays: "Irregular" },
    zh: { name: "京极スタンド", description: "新京极商店街的复古美食店。价格实惠、味道经典。", address: "京都市新京极", closedDays: "不定休" },
    ko: { name: "쿄고쿠 스탠드", description: "신쿄고쿠 상점가의 레트로 음식점. 저렴하고 맛있는 클래식 요리.", address: "교토시 신쿄고쿠", closedDays: "비정기 휴무" },
  },
};
