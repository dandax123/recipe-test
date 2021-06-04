import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRecipe from "app/modules/recipes/mutations/createRecipe"
import { RecipeForm, FORM_ERROR } from "app/modules/recipes/components/RecipeForm"

const NewRecipePage: BlitzPage = () => {
  const router = useRouter()
  const [createRecipeMutation] = useMutation(createRecipe)

  return (
    <div>
      <h1>Create New Recipe</h1>

      <RecipeForm
        submitText="Create Recipe"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRecipe}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const recipe = await createRecipeMutation(values)
            router.push(`/recipes/${recipe.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.RecipesPage()}>
          <a>Recipes</a>
        </Link>
      </p>
    </div>
  )
}

NewRecipePage.authenticate = true
NewRecipePage.getLayout = (page) => <Layout title={"Create New Recipe"}>{page}</Layout>

export default NewRecipePage
