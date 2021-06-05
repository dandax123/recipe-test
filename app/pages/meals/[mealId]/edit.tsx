import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMeal from "app/modules/meals/queries/getMeal"
import updateMeal from "app/modules/meals/mutations/updateMeal"
import { MealForm, FORM_ERROR } from "app/modules/meals/components/MealForm"

export const EditMeal = () => {
  const router = useRouter()
  const mealId = useParam("mealId", "number")
  const [meal] = useQuery(getMeal, { id: mealId })
  const [updateMealMutation] = useMutation(updateMeal)

  return (
    <>
      <Head>
        <title>Edit Meal {meal.id}</title>
      </Head>

      <div>
        <h1>Edit Meal {meal.id}</h1>
        <pre>{JSON.stringify(meal)}</pre>

        <MealForm
          submitText="Update Meal"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateMeal}
          initialValues={meal}
          onSubmit={async (values) => {
            try {
              const updated = await updateMealMutation({
                id: meal.id,
                ...values,
              })
              // await setQueryData(updated)
              router.push(Routes.ShowMealPage({ mealId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditMealPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMeal />
      </Suspense>

      <p>
        <Link href={Routes.MealsPage()}>
          <a>Meals</a>
        </Link>
      </p>
    </div>
  )
}

EditMealPage.authenticate = true
EditMealPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditMealPage
