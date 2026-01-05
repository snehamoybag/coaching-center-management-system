import { prisma } from "../configs/prisma.config";
import { UserRole } from "../generated/prisma/enums";
import { StudentCreateInput } from "../generated/prisma/models";

export const safeStudentOmit = {
  contactNumber: true,
  aadhaarNumber: true,
};

export const create = (userRole: UserRole, inputs: StudentCreateInput) => {
  return prisma.student.create({
    data: inputs,
    omit: userRole === "ADMIN" ? undefined : safeStudentOmit,
  });
};

export const findByAadhaarNumber = (
  userRole: UserRole,
  aadhaarNumber: string,
) => {
  return prisma.student.findUnique({
    where: { aadhaarNumber },
    omit: userRole === "ADMIN" ? undefined : safeStudentOmit,
  });
};
