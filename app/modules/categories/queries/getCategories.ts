import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCategoriesInput
  extends Pick<Prisma.CategoryFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const categories = await (
    await db.category.findMany()
  ).map((x) => ({ label: x.title, value: x.title }))
  return categories
})
