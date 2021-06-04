/*
  Warnings:

  - You are about to drop the column `measure` on the `Ingredient` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Ingredient.measure_unique";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "measure",
ADD COLUMN     "measuresId" INTEGER;

-- CreateTable
CREATE TABLE "Measures" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredient" ADD FOREIGN KEY ("measuresId") REFERENCES "Measures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
