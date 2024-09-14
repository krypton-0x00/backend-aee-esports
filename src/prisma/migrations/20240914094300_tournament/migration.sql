/*
  Warnings:

  - The values [Free,Basic,Premium] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Game" AS ENUM ('BGMI', 'VALORANT');

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('FREE', 'PREMIUM');
ALTER TABLE "User" ALTER COLUMN "subscription" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "subscription" TYPE "UserType_new" USING ("subscription"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
ALTER TABLE "User" ALTER COLUMN "subscription" SET DEFAULT 'FREE';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscription" SET DEFAULT 'FREE';

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "game" "Game" NOT NULL,
    "slots" INTEGER NOT NULL,
    "unit" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
