import { resolver } from "blitz"
import { z } from "zod"
import capitalize from "capitalize"
import db from "db"
const validateMeasure = z.string()

export const addIngredientName = resolver.pipe(resolver.zod(validateMeasure), async (input) => {
  //   console.log("input error", input)
  await db.ingredientNames.create({
    data: {
      name: capitalize(input),
    },
  })
})
export default addIngredientName
