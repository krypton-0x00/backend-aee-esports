/*
  Warnings:

  - Added the required column `logo` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgName` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TournamentStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'HIDDEN');

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "orgName" TEXT NOT NULL,
ADD COLUMN     "status" "TournamentStatus" NOT NULL,
ADD COLUMN     "visibility" "Visibility" NOT NULL;
