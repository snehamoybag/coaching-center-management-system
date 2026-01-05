/*
  Warnings:

  - You are about to alter the column `contactNumber` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - You are about to alter the column `contactNumber` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "contactNumber" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "aadhaarNumber" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "contactNumber" SET DATA TYPE VARCHAR(10);
