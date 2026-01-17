import { prisma } from "../configs/prisma.config";
import { Prisma } from "../generated/prisma/client";

const sumAmount = (records: Partial<{ amount: Prisma.Decimal }>[]): number => {
  return records.reduce(
    (total, currentRecord) => Number(currentRecord.amount) || 0 + total,
    0,
  );
};

export const getAll = async () => {
  const studentsQuery = prisma.student.findMany({
    where: { status: "ACTIVE" },
    include: { payments: true, fees: true },
  });
  const teachersQuery = prisma.student.count({ where: { status: "ACTIVE" } });
  const batchesQuery = prisma.batch.count();
  const feesQuery = prisma.studentFee.count();
  const paymentsQuery = prisma.studentPayment.count();
  const attendancesQuery = prisma.studentAttendance.count();

  const [students, teachers, batches, fees, payments, attendances] =
    await prisma.$transaction([
      studentsQuery,
      teachersQuery,
      batchesQuery,
      feesQuery,
      paymentsQuery,
      attendancesQuery,
    ]);

  const allStudentsCount = students.length;
  const studentsWithDuePayemntCount = students.reduce(
    (total, currentStudent) => {
      const totalFee = sumAmount(currentStudent.fees);
      const totalPayed = sumAmount(currentStudent.payments);

      if (totalFee > totalPayed) {
        return total + 1;
      }

      return total;
    },
    0,
  );

  return {
    students: allStudentsCount,
    StudentsWithDuePayment: studentsWithDuePayemntCount,
    teachers,
    batches,
    fees,
    payments,
    attendances,
  };
};
