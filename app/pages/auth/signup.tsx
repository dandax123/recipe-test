import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/modules/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="grid grid-col-1    w-full justify-center  h-full">
      <div className=" mt-15 shadow-md rounded-lg p-2 mx-auto">
        <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </div>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
