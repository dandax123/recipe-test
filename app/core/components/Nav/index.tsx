import { useRouter } from "@blitzjs/core"
import { Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useMutation, Link, Routes } from "blitz"
import logout from "app/modules/auth/mutations/logout"
import { Button } from ".."
import Search from "../Search"

const UserInfo = ({ currentUser }) => {
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  if (currentUser) {
    return (
      <>
        <div className="flex">
          <span className="align-center">
            <span className="text-blue-700 font-bold text-sm">Logged in as</span> <br />
            <code className="text-blue-600 text-xs">{currentUser.name || currentUser.email}</code>
          </span>
        </div>
        <button
          className="block px-3 py-1 rounded-md bg-blue-100 text-blue-700"
          onClick={async () => {
            await logoutMutation()
            router.push(Routes.Home())
          }}
        >
          Logout
        </button>
      </>
    )
  } else {
    return (
      <>
        <Button.PrimaryButton text="Sign up" onClick={() => {}} />

        <Link href={Routes.LoginPage()}>
          <a className="block px-4 py-2 rounded-md text-indigo-200 ">
            <span className="text-white ">Login</span>
          </a>
        </Link>
      </>
    )
  }
}
const AppBar = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const isActive = (path) => {
    return router.pathname.startsWith(path)
  }

  return (
    <nav className="p-3  bg-primary max-h-20 ">
      <div className="flex justify-between md:justify-between items-center">
        <h1 className="font-bold uppercase  flex space-x-4">Recipe Box</h1>
        <div className="px-3 cursor-pointer sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>

        <ul className="hidden sm:flex flex">
          <Search></Search>
        </ul>
        <ul className="hidden sm:flex space-x-4 ">
          <Suspense fallback="Loading...">
            <UserInfo currentUser={currentUser} />
          </Suspense>
        </ul>
      </div>
    </nav>
  )
}

export default AppBar
