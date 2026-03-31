export type ShopCategory = "cafe" | "bar" | "restaurant";

export interface Shop {
  id: string;
  name: string;
  category: ShopCategory;
  description: string;
  address: string;
  lat: number;
  lng: number;
  openingHours: string;
  closedDays: string;
  image: string;
  stampToken: string;
}

export interface StampRecord {
  shopId: string;
  acquiredAt: string;
}
