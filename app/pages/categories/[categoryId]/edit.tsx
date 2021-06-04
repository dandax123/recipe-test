import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCategory from "app/modules/categories/queries/getCategory"
import updateCategory from "app/modules/categories/mutations/updateCategory"
import { CategoryForm, FORM_ERROR } from "app/modules/categories/components/CategoryForm"

export const EditCategory = () => {
  const router = useRouter()
  const categoryId = useParam("categoryId", "number")
  const [category, { setQueryData }] = useQuery(getCategory, { id: categoryId })
  const [updateCategoryMutation] = useMutation(updateCategory)

  return (
    <>
      <Head>
        <title>Edit Category {category.id}</title>
      </Head>

      <div>
        <h1>Edit Category {category.id}</h1>
        <pre>{JSON.stringify(category)}</pre>

        <CategoryForm
          submitText="Update Category"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCategory}
          initialValues={category}
          onSubmit={async (values) => {
            try {
              const updated = await updateCategoryMutation({
                id: category.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCategoryPage({ categoryId: updated.id }))
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

const EditCategoryPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCategory />
      </Suspense>

      <p>
        <Link href={Routes.CategoriesPage()}>
          <a>Categories</a>
        </Link>
      </p>
    </div>
  )
}

EditCategoryPage.authenticate = true
EditCategoryPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCategoryPage
