/**
 * Next.js calls register() once when a server instance starts. We use it to
 * install the first admin user and starter content into a fresh database, so a
 * deploy needs no manual seeding step (the Docker CMD runs the migrations just
 * before this).
 */
export async function register() {
  // Node server only: not the edge runtime, and not while `next build` runs
  // (the database is not reachable during the Docker build).
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const { bootstrapDatabase } = await import("@/lib/bootstrap");
  // Not awaited: a slow or unreachable database must not delay startup.
  bootstrapDatabase().catch((error) => {
    console.error("[bootstrap] Skipped — could not set up the database:", error);
  });
}
