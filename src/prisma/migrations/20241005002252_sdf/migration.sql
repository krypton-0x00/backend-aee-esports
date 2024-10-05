/*
  Warnings:

  - Added the required column `endData` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startData` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "endData" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startData" TIMESTAMP(3) NOT NULL;
