import type { PriceRequest, PriceRequestStatus } from "@prisma/client";
import { SITE_CONFIG } from "@/constants/site";

export const PRICE_REQUEST_STATUS_LABELS: Record<PriceRequestStatus, string> = {
  NEW: "New",
  SENT: "Sent",
  CLOSED: "Closed",
};

export interface PriceRequestItem {
  category: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export function requestItems(request: Pick<PriceRequest, "items">) {
  return request.items as unknown as PriceRequestItem[];
}

/** The price quoted to the customer: the admin's, else the rate card's. */
export function quotedPrice(request: Pick<PriceRequest, "finalPrice" | "estimate">) {
  return request.finalPrice ?? request.estimate;
}

/** Digits-only number for wa.me; a bare 10-digit number is taken as Indian. */
export function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits.replace(/^0+/, "");
}

export function whatsappMessage(
  request: Pick<PriceRequest, "name" | "fromLabel" | "toLabel" | "token" | "finalPrice" | "estimate">,
  origin: string
) {
  const price = quotedPrice(request).toLocaleString("en-IN");
  return [
    `Hello ${request.name},`,
    `Thank you for contacting ${SITE_CONFIG.fullName}.`,
    `Your estimated moving price from ${request.fromLabel} to ${request.toLabel} is Rs. ${price}.`,
    `Full estimate (PDF): ${origin}/api/estimate/pdf/${request.token}`,
    `Call us on ${SITE_CONFIG.phone} for any questions.`,
  ].join("\n");
}
