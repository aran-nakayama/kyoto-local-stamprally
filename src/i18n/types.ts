export type Locale = "ja" | "en" | "zh" | "ko";

export interface TranslationDict {
  siteName: string;
  siteDescription: string;
  nav: {
    stamps: string;
    shops: string;
    scan: string;
    map: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
  progress: {
    label: string;
    complete: string;
    completeMessage: string;
  };
  category: {
    all: string;
    cafe: string;
    bar: string;
    restaurant: string;
  };
  shops: {
    title: string;
    count: string; // "{count}件のお店" — use {count} placeholder
  };
  shopDetail: {
    introduction: string;
    openingHours: string;
    closedDays: string;
    address: string;
    openInGoogleMaps: string;
    backToList: string;
    stampAcquired: string;
    stampNotAcquired: string;
    stampAcquiredDesc: string;
    stampNotAcquiredDesc: string;
  };
  scan: {
    title: string;
    subtitle: string;
    instruction: string;
    cameraError: string;
    cameraPermission: string;
  };
  stamp: {
    checking: string;
    success: string;
    successDesc: string;
    already: string;
    alreadyDesc: string;
    invalid: string;
    invalidDesc: string;
    backToTop: string;
    redirecting: string;
  };
  map: {
    title: string;
    subtitle: string;
    acquired: string;
    viewDetail: string;
  };
  admin: {
    title: string;
    login: string;
    password: string;
    loginButton: string;
    wrongPassword: string;
    logout: string;
    dashboard: string;
    shopManagement: string;
    qrCodes: string;
    translations: string;
    exportImport: string;
    addShop: string;
    editShop: string;
    deleteShop: string;
    deleteConfirm: string;
    save: string;
    cancel: string;
    reset: string;
    resetConfirm: string;
    export: string;
    import: string;
    shopCount: string;
    generate: string;
    downloadAll: string;
    noTranslation: string;
  };
}
