import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { UserCreateInput } from "../types/user-create-input.type";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  /* 
    WARNING!
    ADMIN MUST CHANGE THEIR DETAILS MANUALLY AFTER SEEDING
  */
  const existingAdmins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true },
    take: 1,
  });

  if (existingAdmins.length) {
    console.error("An admin already exists.");
    return;
  }

  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!password) {
    throw new Error("Seed admin password not found in environment variables.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const data: UserCreateInput = {
    firstName: "admin",
    lastName: "user",
    email: process.env.SEED_ADMIN_EMAIl!,
    passwordHash,
    aadhaarNumber: process.env.SEED_ADMIN_AADHAAR_NUMBER!,
    contactNumber: process.env.SEED_ADMIN_CONTACT_NUMBER!,
    role: "ADMIN",
  };

  const seededAdmin = await prisma.user.upsert({
    where: { email: data.email },
    update: {},
    create: data,
  });

  console.log(seededAdmin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
