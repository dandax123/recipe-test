import { addMeal } from "app/validation"
import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.zod(addMeal), resolver.authorize(), async (input, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  console.log(input)
  const meal = await db.user.update({
    where: {
      id: ctx.session.userId,
    },
    data: {
      meals: {
        create: {
          title: input.title,
          description: input.description,
          cookTime: input.cookTime,
          image: input.image,
          Recipe: {
            create: {
              instruction: input.recipe.instruction,
              ingredients: {
                create: input.recipe.ingredients,
              },
            },
          },
          Category: { create: input.category },
        },
      },
    },
  })
  return meal
})
