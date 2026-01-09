import { prisma } from "../configs/prisma.config";
import { StudentAttendanceInclude } from "../generated/prisma/models";
import { Order } from "../types/order-type";
import { getSafeStudentSelect, getvalidStudentIds } from "./student.model";
import { getSafeTeacherSelect } from "./user.model";

const attendanceInclude: StudentAttendanceInclude = {
  recorder: {
    select: getSafeTeacherSelect("TEACHER"),
  },

  presentStudents: {
    select: getSafeStudentSelect("TEACHER"),
  },
};

export const findById = (id: string) => {
  return prisma.studentAttendance.findUnique({
    where: { id },
    include: attendanceInclude,
  });
};

export const findMany = (
  batchId: string,
  limit: number,
  offset: number,
  order: Order,
) => {
  return prisma.studentAttendance.findMany({
    where: { batchId },
    include: {
      _count: {
        select: { presentStudents: true },
      },
    },
    take: limit,
    skip: offset,
    orderBy: { date: order },
  });
};

export const create = async (
  recorderId: string,
  batchId: string,
  presentStudentIds?: string[],
) => {
  const validStudentIds = await getvalidStudentIds(presentStudentIds || []);

  return prisma.studentAttendance.create({
    data: {
      recorderId,
      batchId,

      presentStudents: {
        connect: validStudentIds,
      },
    },

    include: attendanceInclude,
  });
};

export const update = async (
  id: string,
  addedStudentIds?: string[],
  removedStudentIds?: string[],
) => {
  const [validAddedStudentIds, validRemovedStudentIds] =
    await prisma.$transaction([
      getvalidStudentIds(addedStudentIds || []),
      getvalidStudentIds(removedStudentIds || []),
    ]);

  return prisma.studentAttendance.update({
    where: { id },

    data: {
      presentStudents: {
        disconnect: validRemovedStudentIds,
        connect: validAddedStudentIds,
      },
    },

    include: attendanceInclude,
  });
};
