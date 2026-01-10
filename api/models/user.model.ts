import { prisma } from "../configs/prisma.config";
import { UserRole } from "../generated/prisma/enums";
import { UserSelect } from "../generated/prisma/models";
import { UserCreateInput } from "../types/user-create-input.type";
import { Order } from "../types/order-type";
import { type SafeUser } from "../types/safe-user.type";
import bcrypt from "bcryptjs";
import { getValidBatchIds } from "./batch.model";
import type { UserUpdateInput } from "../types/user-update-input.type";

const safeUserSelect: UserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  role: true,
  registeredAt: true,
  status: true,

  batches: true,
};

export const getSafeTeacherSelect = (viewerRole?: UserRole): UserSelect => {
  const adminOnly = { contactNumber: true, aadhaarNumber: true };

  return {
    ...safeUserSelect,
    ...(viewerRole === "ADMIN" ? adminOnly : {}),
  };
};

export const findById = (id: string): Promise<SafeUser | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: safeUserSelect,
  });
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

export const findByAadhaarNumber = (
  aadhaarNumber: string,
): Promise<SafeUser | null> => {
  return prisma.user.findUnique({
    where: { contactNumber: aadhaarNumber },
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
  const { batchIds, ...restInputs } = inputs;

  const validBatchIds = await getValidBatchIds(batchIds);

  return prisma.user.create({
    data: { ...restInputs, batches: { connect: validBatchIds } },
    select: safeUserSelect,
  });
};

export const update = async (
  id: string,
  inputs: UserUpdateInput,
): Promise<SafeUser> => {
  const { addedBatchIds, removedBatchIds, ...restInputs } = inputs;

  const [validAddedBatchIds, validRemoveBatchIds] = await prisma.$transaction([
    getValidBatchIds(addedBatchIds),
    getValidBatchIds(removedBatchIds),
  ]);

  return prisma.user.update({
    where: { id },
    data: {
      ...restInputs,

      batches: {
        disconnect: validRemoveBatchIds,
        connect: validAddedBatchIds,
      },
    },

    select: safeUserSelect,
  });
};

export const getValidTeacherIds = (teacherIds: string[]) => {
  return prisma.user.findMany({
    where: { id: { in: teacherIds } },
    select: { id: true },
  });
};

export const findManyTeachers = (
  viewerRole: UserRole,
  limit: number,
  offset: number,
  order: Order,
) => {
  return prisma.user.findMany({
    select: {
      ...getSafeTeacherSelect(viewerRole),
      _count: { select: { batches: true } },
    },

    take: limit,
    skip: offset,
    orderBy: { firstName: order },
  });
};

export const findTeacherById = (viewerRole: UserRole, id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: { ...getSafeTeacherSelect(viewerRole), batches: true },
  });
};
