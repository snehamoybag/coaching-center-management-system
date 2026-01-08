import { prisma } from "../configs/prisma.config";
import { UserRole } from "../generated/prisma/enums";
import { Order } from "../types/order-type";
import { getSafeStudentSelect } from "./student.model";
import { getSafeTeacherSelect } from "./user.model";

export const create = (name: string) => {
  return prisma.batch.create({
    data: {
      name,
    },
  });
};

export const findMany = (limit: number, offset: number, order: Order) => {
  return prisma.batch.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      name: order,
    },

    include: {
      _count: {
        select: { teachers: true, students: true },
      },
    },
  });
};

export const findById = (id: string) => {
  return prisma.batch.findUnique({
    where: { id },
    include: {
      _count: {
        select: { teachers: true, students: true },
      },
    },
  });
};

export const findByName = (name: string) => {
  return prisma.batch.findUnique({
    where: { name },
    include: {
      _count: {
        select: { teachers: true, students: true },
      },
    },
  });
};

export const studentsInBatchWithId = (
  viewerRole: UserRole,
  id: string,
  limit: number,
  offset: number,
  order: Order,
) => {
  return prisma.batch.findUnique({
    where: { id },

    include: {
      students: {
        select: getSafeStudentSelect(viewerRole),
        take: limit,
        skip: offset,
        orderBy: {
          registeredAt: order,
        },
      },
    },
  });
};

export const teachersInBatchWithId = (
  viewerRole: UserRole,
  id: string,
  limit: number,
  offset: number,
  order: Order,
) => {
  return prisma.batch.findUnique({
    where: { id },

    include: {
      teachers: {
        select: getSafeTeacherSelect(viewerRole),

        take: limit,
        skip: offset,
        orderBy: {
          registeredAt: order,
        },
      },
    },
  });
};
