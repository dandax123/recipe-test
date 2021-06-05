import { Category, Meal } from "@prisma/client"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { getFavoriteStatus } from "app/core/hooks/useFavorite"
import favoriteMutation from "app/modules/meals/mutations/addFavorites"

import { Router, useMutation, useRouter } from "blitz"
import { useEffect, useState } from "react"
interface MealComponentProps {
  meal: Meal & { Category: Category[] }
}
const MealComponent: React.FC<MealComponentProps> = ({ meal }) => {
  const [isFavorite, setFavorite] = useState(false)
  const [setFavoriteMutation] = useMutation(favoriteMutation)
  const currentUser = useCurrentUser()
  const router = useRouter()
  useEffect(() => {
    const fetchFavoriteState = async () => {
      if (currentUser) {
        const { isFavorite } = await getFavoriteStatus(meal.id)
        setFavorite(isFavorite)
      }
    }
    fetchFavoriteState()
  }, [currentUser, meal.id])
  const handleFavorite = () => {
    if (currentUser) {
      setFavoriteMutation({ id: meal.id, operation: isFavorite ? "disconnect" : "connect" })
      setFavorite(() => !isFavorite)
    } else {
      router.push("/auth/login")
    }
  }

  const handleClick = () => Router.push(`/meals/${meal.id}`)
  return (
    <>
      <div
        className="relative md:m-3 p-2 shadow-md hover:shadow-md hover:bg-gray-100 rounded-lg bg-white overflow-hidden"
        // onClick={}
      >
        <img
          role="button"
          src={meal.image}
          alt=""
          //   width={220}
          //   height={200}
          className="w-full h-40 md:h-56 object-cover rounded-sm"
          onClick={handleClick}
        />
        <div className="absolute top-0 ml-2 p-2 mt-4 bg-secondary-100 text-black text-xs uppercase font-bold rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-1 mt-1 mr-1">{`${meal.cookTime} mins`}</span>
        </div>
        <div className="flex justify-between">
          <div className="py-2">
            {meal.Category.map((category) => {
              return (
                <div className="bg-blue-200 py-1 px-3  text-sm text-black  w-max rounded-sm ">
                  #{category.title}
                </div>
              )
            })}
          </div>
          <div
            className=" ml-2 p-2  text-primary text-xs uppercase font-bold rounded-full cursor-pointer"
            onClick={handleFavorite}
            role="button"
          >
            {isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="p-1" onClick={handleClick} role="button">
          <h3 className="font-medium text-gray-600 text-lg  uppercase">{`${meal.title}`}</h3>
          <p className="text-justify">{`${meal.description}`}</p>
        </div>
      </div>
    </>
  )
}
export default MealComponent
