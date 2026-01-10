/*
  Warnings:

  - You are about to drop the column `studentId` on the `StudentFee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentFee" DROP CONSTRAINT "StudentFee_studentId_fkey";

-- AlterTable
ALTER TABLE "StudentFee" DROP COLUMN "studentId";

-- CreateTable
CREATE TABLE "_StudentToStudentFee" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StudentToStudentFee_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudentToStudentFee_B_index" ON "_StudentToStudentFee"("B");

-- AddForeignKey
ALTER TABLE "_StudentToStudentFee" ADD CONSTRAINT "_StudentToStudentFee_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToStudentFee" ADD CONSTRAINT "_StudentToStudentFee_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentFee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
