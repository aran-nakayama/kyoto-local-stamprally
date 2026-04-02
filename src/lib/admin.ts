const ADMIN_SESSION_KEY = "kyoto-stamprally-admin-session";
// SHA-256 hash of "kyoto2024"
const ADMIN_PASSWORD_HASH = "35ed7d1f3065da77b611ee07dfcd87127c95576f00d3d28b79e4ae7a6407fdac";

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(input: string): Promise<boolean> {
  const hash = await sha256(input);
  return hash === ADMIN_PASSWORD_HASH;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function setAdminAuthenticated(): void {
  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
}

export function adminLogout(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
