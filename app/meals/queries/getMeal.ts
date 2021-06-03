import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetMeal = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetMeal), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const meal = await db.meal.findFirst({
    where: { id },
    include: {
      Recipe: {
        include: {
          ingredients: true,
        },
      },
      Category: true,
    },
  })

  if (!meal) throw new NotFoundError()

  return meal
})
