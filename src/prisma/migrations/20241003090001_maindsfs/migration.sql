/*
  Warnings:

  - You are about to drop the column `tournamentCount` on the `UserGamingProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tournamentCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserGamingProfile" DROP COLUMN "tournamentCount";
