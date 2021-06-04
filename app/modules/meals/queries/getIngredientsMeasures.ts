import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

export default resolver.pipe(async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const categories = await (
    await db.measures.findMany()
  ).map((x, i) => ({ label: x.name, value: x.name }))
  return categories
})
