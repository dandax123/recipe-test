import { resolver } from "blitz"
import db from "db"
export const getFavorite = resolver.pipe(resolver.authorize(), async ({ id }, ctx) => {
  const isFavorite = await db.user.count({
    where: {
      id: ctx.session.userId,
      savedMeals: {
        some: {
          id,
        },
      },
    },
  })
  const isOwner = await db.meal.count({
    where: {
      id,
      author: {
        id: ctx.session.userId,
      },
    },
  })
  // console.log("isOwner", isOwner)
  return { isFavorite: Boolean(isFavorite), isOwner: Boolean(isOwner) }
})

export default getFavorite
