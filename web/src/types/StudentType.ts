import type { ActiveStatusType } from "./ActiveStatusType";

export type StudentType = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // dd/mm/yyyy
  parentName: string;
  contactNumber: string;
  aadhaarNumber: string;
  registeredAt: string;
  status: ActiveStatusType;
};
