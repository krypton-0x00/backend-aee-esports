/*
  Warnings:

  - You are about to drop the column `createdById` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_createdById_fkey";

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "createdById",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
