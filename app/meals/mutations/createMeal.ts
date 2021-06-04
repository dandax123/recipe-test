import { addMeal } from "app/validation"
import { resolver } from "blitz"
import db from "db"
import capitalize from "capitalize"
import { z } from "zod"

export default resolver.pipe(resolver.zod(addMeal), resolver.authorize(), async (input, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  // where: {
  //   id: ctx.session.userId,
  // },
  const meal = await db.meal.create({
    data: {
      title: input.title,
      description: input.description,
      cookTime: input.cookTime,
      image: input.image,
      Recipe: {
        create: {
          instruction: input.instruction,
          ingredients: {
            create: input.ingredients.map((x) => ({
              qty: x.qty,
              name: x.name,
              measures: {
                connect: {
                  name: capitalize(x.measure.value),
                },
              },
            })),
          },
        },
      },
      Category: { connect: input.category },
      author: {
        connect: {
          id: ctx.session.userId,
        },
      },
    },
  })
  return meal
})
// author: {
//   connect
// }

// meals: {
//   create: {

// },
// },
// include: {
// meals: {
//   where:
// }
// }
