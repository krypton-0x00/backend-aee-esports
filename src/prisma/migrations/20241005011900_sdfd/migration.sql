/*
  Warnings:

  - You are about to drop the column `endData` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `startData` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "endData",
DROP COLUMN "startData",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
