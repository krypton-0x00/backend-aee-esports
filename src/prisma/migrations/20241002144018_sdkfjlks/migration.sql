-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscription" SET DEFAULT 'NORMALUSER';

-- CreateTable
CREATE TABLE "SlotList" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "gameType" "Game" NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "ownedBy" TEXT NOT NULL,

    CONSTRAINT "SlotList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SlotList" ADD CONSTRAINT "SlotList_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlotList" ADD CONSTRAINT "SlotList_ownedBy_fkey" FOREIGN KEY ("ownedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
