/*
  Warnings:

  - A unique constraint covering the columns `[aadhaarNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aadhaarNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_contactNumber_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aadhaarNumber" VARCHAR(12) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_aadhaarNumber_key" ON "User"("aadhaarNumber");

-- CreateIndex
CREATE INDEX "User_email_contactNumber_aadhaarNumber_idx" ON "User"("email", "contactNumber", "aadhaarNumber");
