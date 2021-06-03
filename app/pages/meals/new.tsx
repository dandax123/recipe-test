import { Link, useRouter, useMutation, BlitzPage, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import createMeal from "app/meals/mutations/createMeal"
import { MealForm, FORM_ERROR } from "app/meals/components/MealForm"
import { z } from "zod"
import { addMeal } from "app/validation"
import getCategories from "app/categories/queries/getCategories"

export const applyFunction = (values): z.infer<typeof addMeal> => {
  // console.log(values)
  const x: z.infer<typeof addMeal> = {
    title: values.title,
    cookTime: values.cookTime,
    image: values.image,
    category: values?.category?.map(({ label }) => ({
      title: label,
    })),
    description: values.description,
    recipe: {
      ...values.recipe,
      ingredients: [
        { name: "tt", qty: 4, measure: "gg" },
        { name: "tt", qty: 4, measure: "gg" },
      ],
    },
  }
  return x
}

export const getStaticProps = async (context) => {
  const categories = await (await getCategories({}, context)).slice(0, 2)
  return { props: { categories } }
}
const NewMealPage: BlitzPage = ({ categories }) => {
  const router = useRouter()
  const [createMealMutation] = useMutation(createMeal)
  // try {
  // } catch (err) {
  //   console.log(err)
  // }
  // const options = categories.
  console.log(categories)
  return (
    <div className="grid w-full h-full p-4">
      <h1>Create a meal</h1>
      <div className="relative shadow-md ">
        <MealForm
          submitText="Add new Meal"
          schema={addMeal}
          initialValues={{}}
          categories={categories}
          applyFunction={applyFunction}
          onSubmit={async (values) => {
            try {
              const meal = await createMealMutation(applyFunction(values))
              router.push(`/meals/${meal.id}`)
            } catch (error) {
              console.error("addError:", error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>

      <p>
        <Link href={Routes.MealsPage()}>
          <a>Meals</a>
        </Link>
      </p>
    </div>
  )
}

NewMealPage.authenticate = true
NewMealPage.getLayout = (page) => <Layout title={"Create New Meal"}>{page}</Layout>

export default NewMealPage
