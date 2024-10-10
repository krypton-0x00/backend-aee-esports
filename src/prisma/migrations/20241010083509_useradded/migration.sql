-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('NORMALUSER', 'FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "Game" AS ENUM ('BGMI', 'VALORANT');

-- CreateEnum
CREATE TYPE "TournamentStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'HIDDEN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resetPasswordToken" TEXT,
    "resetPasswordExpiresAt" TIMESTAMP(3),
    "verifactionToken" TEXT,
    "verificationExpiresAt" TIMESTAMP(3),
    "subscription" "UserType" NOT NULL DEFAULT 'NORMALUSER',
    "tournamentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGamingProfile" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserGamingProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "game" "Game" NOT NULL,
    "slots" INTEGER NOT NULL,
    "unit" INTEGER NOT NULL,
    "slotsLeft" INTEGER NOT NULL,
    "status" "TournamentStatus" NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "prizePool" INTEGER NOT NULL DEFAULT 0,
    "registrationFee" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlotList" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "gameType" "Game" NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "SlotList_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "PrizeDisturbution" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "ist" INTEGER NOT NULL,
    "second" INTEGER NOT NULL,
    "third" INTEGER NOT NULL,
    "forth" INTEGER,
    "mvp" INTEGER NOT NULL,
    "pwmk" INTEGER,

    CONSTRAINT "PrizeDisturbution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TournamentToUserGamingProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserGamingProfile_email_key" ON "UserGamingProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserGamingProfile_userId_key" ON "UserGamingProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_slotId_key" ON "Team"("slotId");

-- CreateIndex
CREATE UNIQUE INDEX "PrizeDisturbution_tournamentId_key" ON "PrizeDisturbution"("tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentToUserGamingProfile_AB_unique" ON "_TournamentToUserGamingProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentToUserGamingProfile_B_index" ON "_TournamentToUserGamingProfile"("B");

-- AddForeignKey
ALTER TABLE "UserGamingProfile" ADD CONSTRAINT "UserGamingProfile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGamingProfile" ADD CONSTRAINT "UserGamingProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlotList" ADD CONSTRAINT "SlotList_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlotList" ADD CONSTRAINT "SlotList_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "UserGamingProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "SlotList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrizeDisturbution" ADD CONSTRAINT "PrizeDisturbution_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentToUserGamingProfile" ADD CONSTRAINT "_TournamentToUserGamingProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentToUserGamingProfile" ADD CONSTRAINT "_TournamentToUserGamingProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGamingProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
