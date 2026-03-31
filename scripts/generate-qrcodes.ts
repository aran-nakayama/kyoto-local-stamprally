import QRCode from "qrcode";
import { shops } from "../src/data/shops";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = path.join(__dirname, "..", "public", "qrcodes");

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const shop of shops) {
    const url = `${BASE_URL}/stamp/${shop.stampToken}`;
    const outputPath = path.join(OUTPUT_DIR, `${shop.id}.png`);

    await QRCode.toFile(outputPath, url, {
      width: 400,
      margin: 2,
      color: { dark: "#2d2320", light: "#ffffff" },
    });

    console.log(`Generated: ${shop.id} - ${shop.name}`);
  }

  console.log(`\nDone! ${shops.length} QR codes saved to ${OUTPUT_DIR}`);
}

main().catch(console.error);
