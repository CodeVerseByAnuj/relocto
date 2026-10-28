import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import type { PriceRequest } from "@prisma/client";
import { SITE_CONFIG } from "@/constants/site";
import { quotedPrice, requestItems } from "@/lib/priceRequest";

const PAGE = { width: 595, height: 842, margin: 50 };
const NAVY = rgb(0.1, 0.25, 0.55);
const GREY = rgb(0.4, 0.4, 0.45);

// The standard PDF fonts cannot draw the rupee sign, so amounts use "Rs.".
const inr = (amount: number) => `Rs. ${amount.toLocaleString("en-IN")}`;

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

/** Standard PDF fonts only encode Latin-1; anything else would throw. */
const safe = (value: string) => value.replace(/[^\x20-\x7E\xA0-\xFF]/g, "?");

/** Cut text to fit a width so long addresses cannot run off the page. */
function fit(value: string, font: PDFFont, size: number, width: number) {
  let result = safe(value);
  if (font.widthOfTextAtSize(result, size) <= width) return result;
  while (result.length > 1 && font.widthOfTextAtSize(result + "...", size) > width) {
    result = result.slice(0, -1);
  }
  return result + "...";
}

/** The estimate document sent to the customer, as PDF bytes. */
export async function buildEstimatePdf(request: PriceRequest) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page = pdf.addPage([PAGE.width, PAGE.height]);
  let y = PAGE.height - PAGE.margin;
  const contentWidth = PAGE.width - PAGE.margin * 2;
  const right = PAGE.width - PAGE.margin;

  const text = (
    value: string,
    x: number,
    size = 10,
    font = regular,
    color = rgb(0.1, 0.1, 0.12)
  ) => page.drawText(safe(value), { x, y, size, font, color });

  const rightText = (value: string, size = 10, font = regular) =>
    text(value, right - font.widthOfTextAtSize(safe(value), size), size, font);

  const line = (color = rgb(0.85, 0.85, 0.88)) =>
    page.drawLine({
      start: { x: PAGE.margin, y },
      end: { x: right, y },
      thickness: 0.7,
      color,
    });

  // Header
  text(SITE_CONFIG.fullName, PAGE.margin, 18, bold, NAVY);
  y -= 16;
  text(`${SITE_CONFIG.phone}  |  ${SITE_CONFIG.email}`, PAGE.margin, 9, regular, GREY);
  y -= 30;
  text("MOVING ESTIMATE", PAGE.margin, 14, bold);
  rightText(`Date: ${dateFormat.format(new Date())}`, 10);
  y -= 12;
  line();
  y -= 22;

  // Customer + route
  const details: [string, string][] = [
    ["Prepared for", request.name],
    ["Phone", request.phone],
    ["Email", request.email],
    ["Pickup", request.fromLabel],
    ["Drop", request.toLabel],
    ["Distance", `${request.km} km`],
  ];
  for (const [label, value] of details) {
    text(label, PAGE.margin, 10, regular, GREY);
    text(fit(value, regular, 10, contentWidth - 90), PAGE.margin + 90);
    y -= 16;
  }
  y -= 10;

  // Items table
  const cols = { name: PAGE.margin, qty: 340, rate: 420 };
  text("Item", cols.name, 10, bold, NAVY);
  text("Qty", cols.qty, 10, bold, NAVY);
  text("Rate", cols.rate, 10, bold, NAVY);
  rightText("Amount", 10, bold);
  y -= 8;
  line(NAVY);
  y -= 16;

  for (const item of requestItems(request)) {
    if (y < PAGE.margin + 140) {
      page = pdf.addPage([PAGE.width, PAGE.height]);
      y = PAGE.height - PAGE.margin;
    }
    text(fit(`${item.name} (${item.category})`, regular, 10, 270), cols.name);
    text(String(item.quantity), cols.qty);
    text(inr(item.unitPrice), cols.rate);
    rightText(inr(item.unitPrice * item.quantity));
    y -= 16;
  }

  y -= 4;
  line();
  y -= 18;

  // Totals
  const total = quotedPrice(request);
  const adjustment = total - (request.itemsTotal + request.distanceCharge);
  const rows: [string, number][] = [
    ["Items total", request.itemsTotal],
    [`Distance charges (${request.km} km)`, request.distanceCharge],
  ];
  if (adjustment !== 0) rows.push(["Adjustment", adjustment]);
  for (const [label, amount] of rows) {
    text(label, cols.rate - 60, 10, regular, GREY);
    rightText(inr(amount));
    y -= 16;
  }
  y -= 4;
  text("Total estimate", cols.rate - 60, 12, bold, NAVY);
  rightText(inr(total), 12, bold);
  y -= 28;

  if (request.notes) {
    text("Notes", PAGE.margin, 10, bold, NAVY);
    y -= 14;
    for (const noteLine of request.notes.split("\n")) {
      text(fit(noteLine, regular, 10, contentWidth), PAGE.margin);
      y -= 14;
    }
    y -= 8;
  }

  text(
    "This is an estimate. The final price is confirmed by our team before the move.",
    PAGE.margin,
    9,
    regular,
    GREY
  );

  return pdf.save();
}
