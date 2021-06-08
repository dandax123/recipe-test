import { useProfileNavigation } from "app/stores/useProfileNavigation"
import { useRouter, useMutation, Routes } from "blitz"
import logout from "app/modules/auth/mutations/logout"

const Sidebar = () => {
  const { meals, favorites, account } = useProfileNavigation((x) => x.nav)
  const updateActive = useProfileNavigation((x) => x.updateActive)
  const [logoutMutation] = useMutation(logout)

  const changeActive = async (x: string) => {
    updateActive({ [x]: true })
  }
  const router = useRouter()
  const activeClass =
    "flex items-center py-2 mt-3 px-8 bg-gray-200 text-gray-700 md:border-r-4 border-gray-700"
  const inactiveClass =
    "flex items-center mt-3 py-2 px-8 text-gray-600 border-r-4 border-white hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
  return (
    <>
      <div className="bg-gray-200 w-full h-full  ">
        <div className="w-full h-full flex flex-col sm:flex-row ">
          <div className="w-full h-screen bg-white ">
            <nav className="mt-5">
              <a
                className={meals ? activeClass : inactiveClass}
                href="#"
                onClick={() => changeActive("meals")}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium">My Meals</span>
              </a>

              <a
                className={favorites ? activeClass : inactiveClass}
                href="#"
                onClick={() => changeActive("favorites")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>

                <span className="mx-4 font-medium">Favorites</span>
              </a>

              <a
                className="flex items-center mt-5 py-2 px-8 text-gray-600 border-r-4 border-white hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                href="#"
                onClick={async () => {
                  await logoutMutation()
                  router.push(Routes.Home())
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="mx-4 font-medium">Log Out</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
export default Sidebar
