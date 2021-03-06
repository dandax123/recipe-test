import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateRecipe = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateRecipe), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const recipe = await db.recipe.create({ data: input })

  return recipe
})
