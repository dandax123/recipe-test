import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Meal } from "app/core/components"
import searchMeals from "app/modules/meals/queries/searchMeals"
import { useSearchValues } from "app/stores/useSearchValues"

const ITEMS_PER_PAGE = 5

export const MealsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const searchValue = useSearchValues((x) => x.searchValue)
  //   console.log(searchValue)
  const [{ meals, hasMore }] = usePaginatedQuery(searchMeals, {
    search: searchValue,
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:md-grid-cols-4 gap-10 md:gap-2 p-2">
        {meals.map((meal) => (
          <Meal meal={meal} key={meal.id} />
        ))}
      </div>
      {/* <li key={meal.id}>
          <Link href={Routes.ShowMealPage({ mealId: meal.id })}>
            <a>{meal.title}</a>
          </Link>
        </li> */}

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const MealsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Meals</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewMealPage()}>
            <a>Create Meal</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <MealsList />
        </Suspense>
      </div>
    </>
  )
}

MealsPage.authenticate = false
MealsPage.getLayout = (page) => <Layout>{page}</Layout>

export default MealsPage
