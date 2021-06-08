import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetMealsInput
  extends Pick<Prisma.MealFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ orderBy, skip = 0, take = 2 }: GetMealsInput, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: meals,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () =>
      db.meal.count({
        where: {
          favorite: {
            id: ctx.session.userId!,
          },
        },
      }),
    query: (paginateArgs) =>
      db.meal.findMany({
        ...paginateArgs,
        where: {
          favorite: {
            id: ctx.session.userId!,
          },
        },
        include: {
          Category: true,
        },
        orderBy,
      }),
  })

  return {
    meals,
    nextPage,
    hasMore,
    count,
  }
})
