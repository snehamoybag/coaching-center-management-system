import { prisma } from "../configs/prisma.config";
import { UserRole } from "../generated/prisma/enums";
import {
  StudentCreateInput,
  StudentInclude,
  StudentOmit,
  StudentUpdateInput,
} from "../generated/prisma/models";
import type { Order } from "../types/order-type";

const getSafeStudentOmit = (role: UserRole): StudentOmit | undefined => {
  return role !== "ADMIN"
    ? {
        contactNumber: true,
        aadhaarNumber: true,
      }
    : undefined;
};

const getSafeStudentIncludes = (role: UserRole): StudentInclude | undefined => {
  return role === "ADMIN"
    ? {
        batches: true,
        fees: true,
        payments: true,
      }
    : undefined;
};

// ONLY ADMIN CAN CREATE, UPDATE, DELETE
export const create = (inputs: StudentCreateInput) => {
  return prisma.student.create({
    data: inputs,
  });
};

export const update = (id: string, inputs: StudentUpdateInput) => {
  return prisma.student.update({
    where: { id },
    data: inputs,
  });
};

export const findByAadhaarNumber = (
  viewerRole: UserRole,
  aadhaarNumber: string,
) => {
  return prisma.student.findUnique({
    where: { aadhaarNumber },
    omit: getSafeStudentOmit(viewerRole),
    include: getSafeStudentIncludes(viewerRole),
  });
};

export const findById = (viewerRole: UserRole, id: string) => {
  return prisma.student.findUnique({
    where: { id },
    omit: getSafeStudentOmit(viewerRole),
    include: getSafeStudentIncludes(viewerRole),
  });
};

export const findMany = (
  viewerRole: UserRole,
  limit: number,
  offset: number,
  order: Order,
) => {
  return prisma.student.findMany({
    omit: getSafeStudentOmit(viewerRole),

    take: limit,
    skip: offset,
    orderBy: {
      registeredAt: order,
    },

    // TODO: only return the fees status (paid | unpaid) if student has any few due
    // currently it returns list of fees and payments by the student
    include: getSafeStudentIncludes(viewerRole),
  });
};
