/*
  Warnings:

  - Added the required column `recorderId` to the `StudentAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentAttendance" ADD COLUMN     "recorderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentAttendance" ADD CONSTRAINT "StudentAttendance_recorderId_fkey" FOREIGN KEY ("recorderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
