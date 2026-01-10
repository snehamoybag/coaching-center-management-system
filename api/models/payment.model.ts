import { prisma } from "../configs/prisma.config";
import { StudentSelect } from "../generated/prisma/models";
import { Order } from "../types/order-type";
import { PaymentCreateInput } from "../types/payment-create-input.type";

const studentSelect: StudentSelect = {
  id: true,
  firstName: true,
  lastName: true,
  aadhaarNumber: true,
  contactNumber: true,
};

export const create = (input: PaymentCreateInput) => {
  const { amount, mode, studentId, feeId } = input;
  return prisma.studentPayment.create({
    data: { amount, mode, studentId, feeId },
  });
};

export const findMany = (limit: number, offset: number, order: Order) => {
  return prisma.studentPayment.findMany({
    include: {
      fee: true,
      student: { select: studentSelect },
    },

    take: limit,
    skip: offset,
    orderBy: { date: order },
  });
};

export const findById = (id: string) => {
  return prisma.studentPayment.findUnique({
    where: { id },
    include: { fee: true, student: { select: studentSelect } },
  });
};
