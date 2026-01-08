import { prisma } from "../configs/prisma.config";
import { UserRole } from "../generated/prisma/enums";
import { Order } from "../types/order-type";
import { getSafeStudentSelect } from "./student.model";
import { getSafeTeacherSelect } from "./user.model";

const getvalidTeacherIds = (teacherIds: string[]) => {
  return prisma.user.findMany({
    where: { id: { in: teacherIds } },
    select: { id: true },
  });
};

const getvalidStudentIds = (studentIds: string[]) => {
  return prisma.student.findMany({
    where: { id: { in: studentIds } },
    select: { id: true },
  });
};

export const create = async (input: {
  name: string;
  teacherIds?: string[];
  studentIds?: string[];
}) => {
  const { name, teacherIds, studentIds } = input;
  // filter out invalid ids
  const [validTeacherIds, validStudentIds] = await prisma.$transaction([
    getvalidTeacherIds(teacherIds || []),
    getvalidStudentIds(studentIds || []),
  ]);

  return prisma.batch.create({
    data: {
      name,

      teachers: {
        connect: validTeacherIds,
      },

      students: {
        connect: validStudentIds,
      },
    },

    include: {
      // only admin can create a batch
      teachers: {
        select: getSafeTeacherSelect("ADMIN"),
      },

      students: {
        select: getSafeStudentSelect("ADMIN"),
      },
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
