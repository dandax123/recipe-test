import { addMeal } from "app/validation"
import { resolver } from "blitz"
import db from "db"
import capitalize from "capitalize"
import { z } from "zod"

export default resolver.pipe(
  resolver.zod(
    addMeal.extend({
      id: z.number(),
    })
  ),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const meal = await db.meal.update({
      where: { id: input.id },
      data: {
        title: input.title,
        description: input.description,
        cookTime: input.cookTime,
        image: input.image,
        Recipe: {
          create: {
            instruction: input.instruction.map((x) => x.instruction),
            ingredients: {
              create: input.ingredients.map((x) => ({
                qty: x.qty,
                ingredientNames: {
                  connect: {
                    name: capitalize(x.name.value),
                  },
                },
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
      },
    })

    return meal
  }
)
