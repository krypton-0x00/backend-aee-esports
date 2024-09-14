-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Free', 'Basic', 'Premium');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscription" "UserType" NOT NULL DEFAULT 'Free',
ADD COLUMN     "tournamentCount" INTEGER NOT NULL DEFAULT 0;
