import { addMeal } from "app/validation"
import { resolver } from "blitz"
import db from "db"
import capitalize from "capitalize"

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
      author: {
        connect: {
          id: ctx.session.userId,
        },
      },
    },
  })
  return meal
})
// input.ingredients.map((x) => ({
//   qty: x.qty,
//   name: x.name,
//
// }))
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
// const x : RecipeIngredientCreateNestedManyWithoutRecipeInput
// const y: RecipeIngredientCreateNew
