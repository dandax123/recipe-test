import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMeal from "app/meals/queries/getMeal"
import deleteMeal from "app/meals/mutations/deleteMeal"

export const Meal = () => {
  const router = useRouter()
  const mealId = useParam("mealId", "number")
  const [deleteMealMutation] = useMutation(deleteMeal)
  const [meal] = useQuery(getMeal, { id: mealId })

  return (
    <>
      <Head>
        <title>Meal {meal.id}</title>
      </Head>

      <div>
        <h1>Meal {meal.id}</h1>
        <pre>{JSON.stringify(meal, null, 2)}</pre>

        <Link href={Routes.EditMealPage({ mealId: meal.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteMealMutation({ id: meal.id })
              router.push(Routes.MealsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowMealPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.MealsPage()}>
          <a>Meals</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Meal />
      </Suspense>
    </div>
  )
}

ShowMealPage.authenticate = false
ShowMealPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowMealPage
