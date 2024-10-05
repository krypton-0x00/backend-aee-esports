-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_userId_fkey";

-- CreateTable
CREATE TABLE "_TournamentToUserGamingProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentToUserGamingProfile_AB_unique" ON "_TournamentToUserGamingProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentToUserGamingProfile_B_index" ON "_TournamentToUserGamingProfile"("B");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentToUserGamingProfile" ADD CONSTRAINT "_TournamentToUserGamingProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentToUserGamingProfile" ADD CONSTRAINT "_TournamentToUserGamingProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGamingProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
