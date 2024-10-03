/*
  Warnings:

  - You are about to drop the column `ownedBy` on the `SlotList` table. All the data in the column will be lost.
  - You are about to drop the column `tournamentCount` on the `User` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `SlotList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SlotList" DROP CONSTRAINT "SlotList_ownedBy_fkey";

-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_userId_fkey";

-- AlterTable
ALTER TABLE "SlotList" DROP COLUMN "ownedBy",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tournamentCount";

-- CreateTable
CREATE TABLE "UserGamingProfile" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tournamentCount" INTEGER NOT NULL DEFAULT 0,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserGamingProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGamingProfile_email_key" ON "UserGamingProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserGamingProfile_userId_key" ON "UserGamingProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_slotId_key" ON "Team"("slotId");

-- AddForeignKey
ALTER TABLE "UserGamingProfile" ADD CONSTRAINT "UserGamingProfile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGamingProfile" ADD CONSTRAINT "UserGamingProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserGamingProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlotList" ADD CONSTRAINT "SlotList_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "UserGamingProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "SlotList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
