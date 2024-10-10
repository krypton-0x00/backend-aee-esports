-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "prizePool" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "registrationFee" INTEGER NOT NULL DEFAULT 0;

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

-- CreateIndex
CREATE UNIQUE INDEX "PrizeDisturbution_tournamentId_key" ON "PrizeDisturbution"("tournamentId");

-- AddForeignKey
ALTER TABLE "PrizeDisturbution" ADD CONSTRAINT "PrizeDisturbution_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
