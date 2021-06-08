import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createMeal from "app/modules/meals/mutations/createMeal"
import { MealForm, FORM_ERROR } from "app/modules/meals/components/MealForm"
import { z } from "zod"
import { addMeal } from "app/validation"

export const applyFunction = (values): z.infer<typeof addMeal> => {
  const x: z.infer<typeof addMeal> = {
    ...values,
    category: values?.category?.map(({ label }) => ({
      title: label,
    })),
    // instruction: values?.instruction?.map((x) => x.instruction),
  }
  return x
}

// export const getStaticProps = async (context) => {
//   const categories = await (await getCategories({}, context)).slice(0, 2)
//   return { props: { categories } }
// }
const NewMealPage: BlitzPage = () => {
  const router = useRouter()
  const [createMealMutation] = useMutation(createMeal)

  return (
    <div className="w-full h-full p-0">
      {/* <h1>Create a meal</h1> */}
      <div className="bg whiteh-full w-full  ">
        <MealForm
          submitText="Add new Meal"
          schema={addMeal}
          initialValues={{}}
          applyFunction={applyFunction}
          onSubmit={async (values) => {
            try {
              const meal = await createMealMutation(applyFunction(values))
              // console.log(meal)
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

      {/* <p>
        <Link href={Routes.MealsPage()}>
          <a>Meals</a>
        </Link>
      </p> */}
    </div>
  )
}

NewMealPage.authenticate = true
NewMealPage.getLayout = (page) => <Layout title={"Create New Meal"}>{page}</Layout>

export default NewMealPage
