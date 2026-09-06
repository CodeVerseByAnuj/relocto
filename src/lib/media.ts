export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4 MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

export function isAllowedImageType(type: string): type is AllowedImageType {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(type);
}

export const ALLOWED_IMAGE_ACCEPT = ALLOWED_IMAGE_TYPES.join(",");

/** Media stored in the DB is served from this path prefix. */
export function mediaUrl(id: string): string {
  return `/api/media/${id}`;
}

export function isMediaUrl(value: string): boolean {
  return /^\/api\/media\/[a-z0-9]+$/i.test(value);
}
