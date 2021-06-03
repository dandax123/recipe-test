import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecipe from "app/recipes/queries/getRecipe"
import updateRecipe from "app/recipes/mutations/updateRecipe"
import { RecipeForm, FORM_ERROR } from "app/recipes/components/RecipeForm"

export const EditRecipe = () => {
  const router = useRouter()
  const recipeId = useParam("recipeId", "number")
  const [recipe, { setQueryData }] = useQuery(getRecipe, { id: recipeId })
  const [updateRecipeMutation] = useMutation(updateRecipe)

  return (
    <>
      <Head>
        <title>Edit Recipe {recipe.id}</title>
      </Head>

      <div>
        <h1>Edit Recipe {recipe.id}</h1>
        <pre>{JSON.stringify(recipe)}</pre>

        <RecipeForm
          submitText="Update Recipe"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateRecipe}
          initialValues={recipe}
          onSubmit={async (values) => {
            try {
              const updated = await updateRecipeMutation({
                id: recipe.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowRecipePage({ recipeId: updated.id }))
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

const EditRecipePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRecipe />
      </Suspense>

      <p>
        <Link href={Routes.RecipesPage()}>
          <a>Recipes</a>
        </Link>
      </p>
    </div>
  )
}

EditRecipePage.authenticate = true
EditRecipePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRecipePage
