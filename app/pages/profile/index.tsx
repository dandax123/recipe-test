import { Suspense } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  Routes,
  useSession,
  useQuery,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getMeals from "app/modules/meals/queries/getMeals"
import { Meal, Sidebar } from "app/core/components"
import { useProfileNavigation } from "../../stores/useProfileNavigation"
import getFavorites from "app/modules/meals/queries/getFavorites"

const ITEMS_PER_PAGE = 5

export const ProfileMealsList = ({ where }) => {
  const { meals: mealActive, favorites, account } = useProfileNavigation((x) => x.nav)

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ meals, hasMore }] = usePaginatedQuery(favorites ? getFavorites : getMeals, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where,
  })
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      {mealActive ? (
        <div className="md:ml-5">
          <button
            className="px-3 py-2 rounded-md shadow-md bg-primary text-white my-2 font-medium outline-none focus:outline-none"
            onClick={() => router.push("/meals/new")}
          >
            <span className="ml-2 ">Create New Meal</span>
          </button>
        </div>
      ) : null}
      <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:md-grid-cols-4 gap-10 md:gap-2 p-0">
        {meals.map((meal) => (
          <Meal meal={meal} key={meal.id} />
        ))}
      </div>
      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ProfilePage: BlitzPage = () => {
  const { meals, favorites, account } = useProfileNavigation((x) => x.nav)
  //   const [favoriteMeals] = useQuery(getFavorites, {})
  //   console.log(favoriteMeals)
  const session = useSession()

  const myMeals = {
    author: {
      id: session.userId!,
    },
  }

  return (
    <>
      <Head>
        <title>Meals</title>
      </Head>

      <div>
        {/* <p>
          <Link href={Routes.NewMealPage()}>
            <a>Create Meal</a>
          </Link>
        </p> */}

        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-12">
            <div className="md:col-span-2">
              <Sidebar />
            </div>
            <div className="col-span-8">
              {meals || favorites ? <ProfileMealsList where={myMeals} /> : null}
            </div>
          </div>
        </Suspense>
      </div>
    </>
  )
}

ProfilePage.authenticate = true
ProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default ProfilePage
