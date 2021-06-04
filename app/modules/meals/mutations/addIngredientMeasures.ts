import { resolver } from "blitz"
import { z } from "zod"
import capitalize from "capitalize"
import db from "db"
const validateMeasure = z.object({ name: z.string() })
export const addIngredientsMutation = resolver.pipe(
  resolver.zod(validateMeasure),
  resolver.authorize(),
  async (input) => {
    await db.measures.create({
      data: {
        name: capitalize(input.name),
      },
    })
  }
)
export default addIngredientsMutation
