import { ActiveStatus, UserRole } from "../generated/prisma/enums";

export type UserCreateInput = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  contactNumber: string;
  aadhaarNumber: string;
  role?: UserRole;
  status?: ActiveStatus;

  batchIds?: string[];
};
