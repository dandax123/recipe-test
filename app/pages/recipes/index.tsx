import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecipes from "app/recipes/queries/getRecipes"

const ITEMS_PER_PAGE = 100

export const RecipesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ recipes, hasMore }] = usePaginatedQuery(getRecipes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link href={Routes.ShowRecipePage({ recipeId: recipe.id })}>
              <a>{recipe.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const RecipesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewRecipePage()}>
            <a>Create Recipe</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RecipesList />
        </Suspense>
      </div>
    </>
  )
}

RecipesPage.authenticate = true
RecipesPage.getLayout = (page) => <Layout>{page}</Layout>

export default RecipesPage
