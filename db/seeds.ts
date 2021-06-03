import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  //create categories

  for (let i = 0; i < 10; i++) {
    try {
      const testMeal = await db.user.update({
        where: {
          id: 1,
        },
        data: {
          meals: {
            create: {
              title: `test meal ${i}`,
              description: "nice meal foa fdasd fasdfasdf asdfasdf asdfasdf asd asdf asdf asdf ",
              cookTime: 40,
              image: "asdfasdf",
              Recipe: {
                create: {
                  instruction: "boil for one minute",
                  ingredients: {
                    create: [
                      { name: "maggie", qty: 3, measure: "cups" },
                      { name: "salt", qty: 1, measure: "spoons" },
                    ],
                  },
                },
              },
              Category: { create: [{ title: "test" }] },
            },
          },
        },
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default seed
