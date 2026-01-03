import { User } from "../generated/prisma/client";

type BannedKeys = "email" | "passwordHash" | "contactNumber";

export type SafeUser = Omit<User, BannedKeys>;
