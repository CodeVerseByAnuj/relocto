import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "default";

export const DEFAULT_POSTER = "/images/poster.png";

/** The admin-chosen poster URL, or "" when none has been uploaded. */
export async function getStoredPoster(): Promise<string> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: SETTINGS_ID },
  });
  return settings?.posterImage ?? "";
}

/** Poster to render: the uploaded one, else the bundled default. */
export async function getPosterImage(): Promise<string> {
  try {
    return (await getStoredPoster()) || DEFAULT_POSTER;
  } catch {
    return DEFAULT_POSTER;
  }
}

export async function savePosterImage(posterImage: string) {
  await prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, posterImage },
    update: { posterImage },
  });
  revalidatePath("/", "layout");
}
