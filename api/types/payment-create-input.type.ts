import { PaymentMode } from "../generated/prisma/enums";

export type PaymentCreateInput = {
  amount: number;
  mode: PaymentMode;
  feeId: string;
  studentId: string;
};
