/*
  Warnings:

  - You are about to alter the column `amount` on the `StudentFee` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `StudentPayment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "StudentFee" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "StudentPayment" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);
