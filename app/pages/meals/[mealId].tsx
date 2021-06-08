import { Suspense, useEffect, useState } from "react"
import { Head, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getMeal from "app/modules/meals/queries/getMeal"
// import deleteMeal from "app/modules/meals/mutations/deleteMeal"
import capitalize from "capitalize"
import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share"
import favoriteMutation from "app/modules/meals/mutations/addFavorites"
import { getFavoriteStatus } from "app/core/hooks/useFavorite"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Modal } from "app/core/components"

export const Meal = () => {
  const router = useRouter()
  const mealId = useParam("mealId", "number")
  // const [deleteMealMutation] = useMutation(deleteMeal)
  const [meal] = useQuery(getMeal, { id: mealId })
  const [isFavorite, setFavorite] = useState(false)
  const [open, setOpen] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [setFavoriteMutation] = useMutation(favoriteMutation)
  const currentUser = useCurrentUser()
  useEffect(() => {
    const fetchFavoriteState = async () => {
      if (currentUser) {
        const { isFavorite, isOwner } = await getFavoriteStatus(meal.id)
        setFavorite(isFavorite)
        setIsOwner(isOwner)
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

  return (
    <>
      <Head>
        <title>{capitalize(meal.title)} | Meal </title>
      </Head>

      {/* <h1>Meal {meal.id}</h1> */}
      <div className="grid md:grid-cols-2  gap-4 md:gap-4 mb-20 ">
        <div className="p-2 md:p-3  md:py-5 md:px-2 shadow-md md:shadow-none rounded-lg flex justify-items-center ">
          <img
            src={meal.image}
            className="w-full  h-48 md:h-72 object-cover rounded-md md:ml-6 my-auto"
            alt={meal.title}
          ></img>
        </div>
        <div className="p-2 md:py-5 md:px-0 shadow-md md:shadow-none rounded-lg">
          <h1 className="text-4xl md:text-4xl text-primary font-medium mb-2">
            {capitalize(meal.title, true)}
          </h1>
          {meal.Category.map((category) => {
            return (
              <div className="bg-blue-200 py-1 px-3  text-sm text-black mb-2 mr-3 w-max rounded-sm inline-block ">
                #{category.title}
              </div>
            )
          })}
          <div className="grid grid-cols-2">
            <div className="col-span-2">
              <div className="flex justify-between">
                <button
                  className="px-3 py-2 w-max mr-2 rounded-md shadow-md bg-primary text-white my-2 font-medium outline-none focus:outline-none"
                  onClick={handleFavorite}
                >
                  {isFavorite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block"
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
                      className="h-6 w-6 inline-block"
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
                  <span className="ml-2 ">
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </span>
                </button>
                {isOwner ? (
                  <button
                    className="px-3 py-2 rounded-md shadow-md bg-white text-primary my-2 font-medium outline-none focus:outline-none"
                    onClick={() => router.push(`/meals/${meal.id}/edit`)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    <span className="ml-2 ">Edit Meal</span>
                  </button>
                ) : null}
                {isOwner ? (
                  <button
                    className="px-3 py-2 rounded-md shadow-md bg-red-500 text-white my-2 font-medium outline-none focus:outline-none"
                    onClick={() => setOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span className="ml-2 ">Remove Meal</span>
                  </button>
                ) : null}
              </div>
            </div>
            <div className="col-span-2">{meal.description}</div>
            {/* <div>
              Creator:
              <Link href="#">
                <a className="text-blue-600 ml-2 underline curser-pointer">{meal.author?.name}</a>
              </Link>
            </div> */}
          </div>
          <div className="grid grid-cols-12 py-2 gap-12  md:gap-0 ">
            <div className="col-span-1 pt-1">Share:</div>
            <div className="col-span-10">
              <div className="mr-2 inline-block">
                <FacebookShareButton url="https://sdfs">
                  <FacebookIcon size={32} borderRadius={12} />
                </FacebookShareButton>
              </div>
              <div className="mr-2 inline-block">
                <TwitterShareButton url="https://sdfs">
                  <TwitterIcon size={32} borderRadius={12} />
                </TwitterShareButton>
              </div>
              <div className="mr-2 inline-block">
                <WhatsappShareButton url="https://sdfs">
                  <WhatsappIcon size={32} borderRadius={12} />
                </WhatsappShareButton>
              </div>
              <div className="mr-2 inline-block">
                <TelegramShareButton url="https://sdfs">
                  <TelegramIcon size={32} borderRadius={12} />
                </TelegramShareButton>
              </div>
              <div className="mr-2 inline-block">
                <RedditShareButton url="https://sdfs">
                  <RedditIcon size={32} borderRadius={12} />
                </RedditShareButton>
              </div>
            </div>
          </div>
          <h1 className="text-sm md:text-lg underline  font-medium">Ingredients</h1>
          <div className="px-2">
            <div className="grid-cols-1">
              {meal.Recipe?.ingredients.map((x, i) => {
                return (
                  <div>
                    {i + 1}. {x.qty}x {x.measures?.name} of {x.ingredientNames?.name}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="px-2 shadow-md md:shadow-none rounded-md md:ml-6">
          <h1 className="text-2xl underline font-medium">Directions</h1>
          {meal.Recipe?.instruction.map((x, i) => {
            return (
              <div className="p-0 my-2">
                {i + 1}. {x}
              </div>
            )
          })}
        </div>
        <Modal open={open} setOpen={setOpen} mealId={meal.id} />
      </div>
    </>
  )
}

// {/* <pre>{JSON.stringify(meal, null, 2)}</pre> */}

// <Link href={Routes.EditMealPage({ mealId: meal.id })}>
//   <a>Edit</a>
// </Link>

// <button
//   type="button"
//   onClick={async () => {
//     if (window.confirm("This will be deleted")) {
//       await deleteMealMutation({ id: meal.id })
//       router.push(Routes.MealsPage())
//     }
//   }}
//   style={{ marginLeft: "0.5rem" }}
// >
//   Delete
// </button>
const ShowMealPage: BlitzPage = () => {
  return (
    <div>
      {/* <p>
        <Link href={Routes.MealsPage()}>
          <a>Meals</a>
        </Link>
      </p> */}

      <Suspense fallback={<div>Loading...</div>}>
        <Meal />
      </Suspense>
    </div>
  )
}

ShowMealPage.authenticate = false
ShowMealPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowMealPage
