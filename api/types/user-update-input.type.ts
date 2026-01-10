import { ActiveStatus, UserRole } from "../generated/prisma/enums";

export type UserUpdateInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  passwordHash?: string;
  contactNumber?: string;
  aadhaarNumber?: string;
  role?: UserRole;
  status?: ActiveStatus;

  addedBatchIds?: string[];
  removedBatchIds?: string[];
};
