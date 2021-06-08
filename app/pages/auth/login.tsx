import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/modules/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="grid grid-col-1 my-12  w-full justify-center md:my-28  h-full">
      <div className=" ">
        <LoginForm
          onSuccess={() => {
            const next = router.query.next
              ? decodeURIComponent(router.query.next as string)
              : "/profile"
            router.push(next)
          }}
        />
      </div>
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
