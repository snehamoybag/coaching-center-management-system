import { prisma } from "../configs/prisma.config";
import { UserCreateInput } from "../generated/prisma/models";
import { type SafeUser } from "../types/safe-user.type";
import bcrypt from "bcryptjs";

export const safeUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  role: true,
  registeredAt: true,
  status: true,
};

export const findById = (id: string): Promise<SafeUser | null> => {
  return prisma.user.findUnique({ where: { id }, select: safeUserSelect });
};

export const findByEmail = (email: string): Promise<SafeUser | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: safeUserSelect,
  });
};

export const findByContactNumber = (
  contactNumber: string,
): Promise<SafeUser | null> => {
  return prisma.user.findUnique({
    where: { contactNumber },
    select: safeUserSelect,
  });
};

export const getIsPasswordMatching = async (
  userId: string,
  password: string,
): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return false;
  }

  return bcrypt.compare(password, user.passwordHash);
};

export const create = async (inputs: UserCreateInput): Promise<SafeUser> => {
  return prisma.user.create({ data: inputs, select: safeUserSelect });
};
