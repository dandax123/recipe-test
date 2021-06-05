import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const ingredientsName = await (
    await db.ingredientNames.findMany({
      select: {
        name: true,
      },
    })
  ).map((x) => ({ label: x.name, value: x.name }))
  const categories = await (
    await db.measures.findMany()
  ).map((x) => ({ label: x.name, value: x.name }))

  return { categories, ingredientsName }
})
