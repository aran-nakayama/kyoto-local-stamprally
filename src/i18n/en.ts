import { TranslationDict } from "./types";

export const en: TranslationDict = {
  siteName: "Kyoto Stamp Rally",
  siteDescription:
    "A stamp rally exploring local cafes, bars, and restaurants in Kyoto",
  nav: {
    stamps: "Stamps",
    shops: "Shops",
    scan: "Scan",
    map: "Map",
  },
  home: {
    title: "Kyoto Stamp Rally",
    subtitle: "Explore local spots in Kyoto",
  },
  progress: {
    label: "Progress",
    complete: "Complete!",
    completeMessage:
      "You've collected all the stamps! Congratulations!",
  },
  category: {
    all: "All",
    cafe: "Cafe",
    bar: "Bar",
    restaurant: "Restaurant",
  },
  shops: {
    title: "Shop List",
    count: "{count} shops",
  },
  shopDetail: {
    introduction: "About",
    openingHours: "Hours",
    closedDays: "Closed",
    address: "Address",
    openInGoogleMaps: "📍 Open in Google Maps",
    backToList: "← Back to shop list",
    stampAcquired: "Stamp collected!",
    stampNotAcquired: "Not collected",
    stampAcquiredDesc: "You've already collected this shop's stamp",
    stampNotAcquiredDesc:
      "Scan the QR code at the shop to collect the stamp",
  },
  scan: {
    title: "QR Scan",
    subtitle: "Scan a shop's QR code",
    instruction: "Point your camera at the QR code displayed at the shop",
    cameraError: "Camera Error",
    cameraPermission:
      "Could not start the camera. Please allow camera access.",
  },
  stamp: {
    checking: "Checking...",
    success: "Stamp collected!",
    successDesc: "Added to your stamp card!",
    already: "Already collected",
    alreadyDesc: "You've already collected this stamp.",
    invalid: "Invalid QR Code",
    invalidDesc:
      "This QR code is not a valid stamp rally code.",
    backToTop: "Back to top",
    redirecting: "Redirecting to your stamp card in 3 seconds...",
  },
  map: {
    title: "Map",
    subtitle: "Find shop locations",
    acquired: "Collected",
    viewDetail: "View details →",
  },
  admin: {
    title: "Admin Panel",
    login: "Admin Login",
    password: "Password",
    loginButton: "Log in",
    wrongPassword: "Incorrect password",
    logout: "Log out",
    dashboard: "Dashboard",
    shopManagement: "Shop Management",
    qrCodes: "QR Codes",
    translations: "Translations",
    exportImport: "Export / Import",
    addShop: "Add Shop",
    editShop: "Edit Shop",
    deleteShop: "Delete",
    deleteConfirm: "Are you sure you want to delete this shop?",
    save: "Save",
    cancel: "Cancel",
    reset: "Reset to Default",
    resetConfirm: "Are you sure you want to reset data to default?",
    export: "Export",
    import: "Import",
    shopCount: "Shop count",
    generate: "Generate",
    downloadAll: "Download All",
    noTranslation: "Not translated",
  },
};
