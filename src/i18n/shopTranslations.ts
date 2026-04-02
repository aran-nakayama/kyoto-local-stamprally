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
  },
  "shop-002": {
    en: { name: "Sarasa Nishijin", description: "A cafe renovated from a former public bathhouse. Beautiful tiled walls create a unique open atmosphere.", address: "Kita-ku, Kyoto", closedDays: "Wednesday" },
  },
  "shop-003": {
    en: { name: "Elephant Factory Coffee", description: "A hidden roastery in an alley. Carefully roasted single-origin beans.", address: "Kawaramachi area, Kyoto", closedDays: "Tuesday" },
  },
  "shop-004": {
    en: { name: "Bar Kohaku", description: "An authentic bar in the Kiyamachi district. Exquisite cocktails made by skilled bartenders.", address: "Kiyamachi, Kyoto", closedDays: "Sunday" },
  },
  "shop-005": {
    en: { name: "Bar Rocking Chair", description: "A jazz bar with live performances. Enjoy quality whisky with music.", address: "Sanjo area, Kyoto", closedDays: "Monday" },
  },
  "shop-006": {
    en: { name: "Menya Inoichi", description: "A Michelin-recognized ramen shop. Clear soy sauce broth with refined flavor.", address: "Kawaramachi, Kyoto", closedDays: "Wednesday" },
  },
  "shop-007": {
    en: { name: "Demachi Futaba", description: "A long-established wagashi shop since 1899. Famous for their mame-mochi (bean rice cake).", address: "Demachi, Kyoto", closedDays: "Tuesday, 4th Wed" },
  },
  "shop-008": {
    en: { name: "Rokuyosha Underground", description: "An underground kissaten since 1950. Hand-drip coffee with rich aroma.", address: "Kawaramachi, Kyoto", closedDays: "Wednesday" },
  },
  "shop-009": {
    en: { name: "Ace Hotel Kyoto Lobby Bar", description: "A stylish hotel lobby bar fusing Kyoto culture with Portland design.", address: "Karasuma area, Kyoto", closedDays: "None" },
  },
  "shop-010": {
    en: { name: "Teuchi Udon Tanaka", description: "Handmade udon with firm texture. Simple yet deeply flavorful dashi broth.", address: "Nishiki area, Kyoto", closedDays: "Sunday" },
  },
  "shop-011": {
    en: { name: "Cafe Marble Bukkoji", description: "A machiya cafe on Bukkoji street. Seasonal pancakes are a must-try.", address: "Bukkoji, Kyoto", closedDays: "Irregular" },
  },
  "shop-012": {
    en: { name: "Sakaba I", description: "A standing bar with excellent sake selection. Perfectly paired small dishes.", address: "Pontocho area, Kyoto", closedDays: "Sunday" },
  },
  "shop-013": {
    en: { name: "Kitchen Gorilla", description: "A local favorite yoshoku restaurant. Generous portions of hearty Western-Japanese cuisine.", address: "Marutamachi, Kyoto", closedDays: "Thursday" },
  },
  "shop-014": {
    en: { name: "Weekenders Coffee", description: "A specialty coffee stand. Award-winning latte art and carefully sourced beans.", address: "Tominokoji, Kyoto", closedDays: "Monday" },
  },
  "shop-015": {
    en: { name: "Kyogoku Stand", description: "A retro food stand in the Shinkyogoku shopping area. Affordable and tasty classic dishes.", address: "Shinkyogoku, Kyoto", closedDays: "Irregular" },
  },
};
