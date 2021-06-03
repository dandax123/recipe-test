-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "favoriteId" INTEGER;

-- AddForeignKey
ALTER TABLE "Meal" ADD FOREIGN KEY ("favoriteId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
