import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { LOCATIONS } from "../src/constants/locations.ts";
import { buildDefaultLocationContent } from "../src/lib/defaultLocationContent.ts";

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log(
      "• Skipping admin user (set ADMIN_EMAIL and ADMIN_PASSWORD in .env to create one)."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Admin" },
  });
  console.log(`• Admin user ready: ${email}`);
}

async function seedLocations() {
  for (const [index, loc] of LOCATIONS.entries()) {
    const content = buildDefaultLocationContent({
      city: loc.city,
      state: loc.state,
      description: loc.description,
      areas: loc.areas,
    });

    const { services, features, ...scalars } = content;

    await prisma.location.upsert({
      where: { slug: loc.slug },
      update: {
        ...scalars,
        order: index,
        city: loc.city,
        state: loc.state,
        services: {
          deleteMany: {},
          create: services.map((s, i) => ({ ...s, order: i })),
        },
        features: {
          deleteMany: {},
          create: features.map((f, i) => ({ ...f, order: i })),
        },
      },
      create: {
        ...scalars,
        order: index,
        slug: loc.slug,
        city: loc.city,
        state: loc.state,
        services: { create: services.map((s, i) => ({ ...s, order: i })) },
        features: { create: features.map((f, i) => ({ ...f, order: i })) },
      },
    });
  }
  console.log(`• Seeded ${LOCATIONS.length} locations.`);
}

async function main() {
  await seedAdmin();
  await seedLocations();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
