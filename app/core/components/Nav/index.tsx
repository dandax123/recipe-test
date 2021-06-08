import { useRouter } from "@blitzjs/core"
import { Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useMutation, Link, Image, Routes } from "blitz"
import logout from "app/modules/auth/mutations/logout"
import { Button } from ".."
import Search from "../Search"

const UserInfo = ({ currentUser }) => {
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  if (currentUser) {
    return (
      <>
        <div
          className="flex items-center text-white cursor-pointer font-bold"
          onClick={() => router.push("/profile")}
        >
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Profile
        </div>
        <button
          className="block px-3 py-2 rounded-md bg-blue-100 text-blue-700"
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
        <Button.PrimaryButton onClick={() => router.push("/auth/signup")}>
          Sign up
        </Button.PrimaryButton>

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

  // const isActive = (path) => {
  //   return router.pathname.startsWith(path)
  // }

  return (
    <nav className="p-1  bg-primary max-h-20 ">
      <div className="flex justify-between md:justify-between items-center">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image src="/logo.png" width={160} height={64} />
        </div>

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
