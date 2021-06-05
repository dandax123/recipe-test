import { resolver } from "blitz"
import db from "db"
export const favoriteMutation = resolver.pipe(
  resolver.authorize(),
  async ({ id, operation }, ctx) => {
    await db.user.update({
      where: {
        id: ctx.session.userId,
      },
      data: {
        savedMeals: {
          [`${operation}`]: {
            id,
          },
        },
      },
    })
  }
)
// export const addIngredientName = resolver.pipe(resolver.zod(validateMeasure), async (input) => {
//   await db.ingredientNames.create({
//     data: {
//       name: capitalize(input.name),
//     },
//   })
// })
export default favoriteMutation
