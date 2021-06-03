import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCategory from "app/categories/queries/getCategory"
import deleteCategory from "app/categories/mutations/deleteCategory"

export const Category = () => {
  const router = useRouter()
  const categoryId = useParam("categoryId", "number")
  const [deleteCategoryMutation] = useMutation(deleteCategory)
  const [category] = useQuery(getCategory, { id: categoryId })

  return (
    <>
      <Head>
        <title>Category {category.id}</title>
      </Head>

      <div>
        <h1>Category {category.id}</h1>
        <pre>{JSON.stringify(category, null, 2)}</pre>

        <Link href={Routes.EditCategoryPage({ categoryId: category.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCategoryMutation({ id: category.id })
              router.push(Routes.CategoriesPage())
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

const ShowCategoryPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CategoriesPage()}>
          <a>Categories</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Category />
      </Suspense>
    </div>
  )
}

ShowCategoryPage.authenticate = true
ShowCategoryPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCategoryPage
