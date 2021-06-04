import { createCategoryValidation } from "app/validation"
import { resolver } from "blitz"
import capitalize from "capitalize"
import db from "db"
export default resolver.pipe(
  resolver.zod(createCategoryValidation),
  resolver.authorize(),
  async (input) => {
    // console.error("my input: ", input)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const category = await db.category.create({
      data: {
        title: capitalize(input.title),
      },
    })

    return category
  }
)
