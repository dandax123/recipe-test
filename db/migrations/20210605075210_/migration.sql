/*
  Warnings:

  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_measuresId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropTable
DROP TABLE "Ingredient";

-- CreateTable
CREATE TABLE "IngredientNames" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "recipeId" INTEGER,
    "measuresId" TEXT,
    "ingredientName" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IngredientNames.name_unique" ON "IngredientNames"("name");

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD FOREIGN KEY ("measuresId") REFERENCES "Measures"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD FOREIGN KEY ("ingredientName") REFERENCES "IngredientNames"("name") ON DELETE SET NULL ON UPDATE CASCADE;
