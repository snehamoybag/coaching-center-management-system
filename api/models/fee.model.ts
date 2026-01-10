import { prisma } from "../configs/prisma.config";
import { getvalidStudentIds } from "./student.model";
import { Order } from "../types/order-type";
import { StudentSelect } from "../generated/prisma/models";
import { Prisma } from "../generated/prisma/client";

const getStudentSelects = (feeId?: string): StudentSelect => ({
  id: true,
  firstName: true,
  lastName: true,

  payments: { where: { feeId } }, // use to check if student payed the fee or not
});

export const create = async (
  name: string,
  amount: number,
  studentIds: string[] = [],
) => {
  const validStudentIds = await getvalidStudentIds(studentIds);

  return prisma.studentFee.create({
    data: {
      name,
      amount: Prisma.Decimal(amount),
      students: { connect: validStudentIds },
    },
    include: { students: true },
  });
};

export const update = async (
  id: string,
  name?: string,
  amount?: number,
  addedStudentIds?: string[],
  removedStudentIds?: string[],
) => {
  const [validAddedStudentIds, validRemovedStudentIds] =
    await prisma.$transaction([
      getvalidStudentIds(addedStudentIds || []),
      getvalidStudentIds(removedStudentIds || []),
    ]);

  return prisma.studentFee.update({
    where: { id },
    data: {
      name,
      amount: Prisma.Decimal(amount || 0),
      students: {
        disconnect: validRemovedStudentIds,
        connect: validAddedStudentIds,
      },
    },

    include: {
      students: {
        select: getStudentSelects(id),
      },
    },
  });
};

export const deleteById = (id: string) => {
  return prisma.studentFee.delete({ where: { id } });
};

export const findMany = (limit: number, offset: number, order: Order) => {
  return prisma.studentFee.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      name: order,
    },

    include: {
      _count: {
        select: { students: true },
      },
    },
  });
};

export const findById = (
  id: string,
  studentsLimit?: number,
  studentsOffset?: number,
  order?: Order,
) => {
  return prisma.studentFee.findUnique({
    where: { id },
    include: {
      students: {
        select: getStudentSelects(id),

        take: studentsLimit,
        skip: studentsOffset,
        orderBy: {
          firstName: order,
        },
      },
    },
  });
};

export const findByName = (
  name: string,
  studentsLimit?: number,
  studentsOffset?: number,
  order?: Order,
) => {
  return prisma.studentFee.findUnique({
    where: { name },
    include: {
      students: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          payments: { where: { fee: { name } } }, // use to check if student payed the fee or not
        },

        take: studentsLimit,
        skip: studentsOffset,
        orderBy: {
          firstName: order,
        },
      },
    },
  });
};
