/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Measures` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_measuresId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "measuresId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Measures.name_unique" ON "Measures"("name");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD FOREIGN KEY ("measuresId") REFERENCES "Measures"("name") ON DELETE SET NULL ON UPDATE CASCADE;
