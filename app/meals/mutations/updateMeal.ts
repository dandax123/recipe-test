import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateMeal = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateMeal),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const meal = await db.meal.update({ where: { id }, data })

    return meal
  }
)
