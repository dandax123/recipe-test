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
  return isFavorite
})

export default getFavorite
