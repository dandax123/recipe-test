import { Meal } from "@prisma/client"
import { Image, Routes, Router } from "blitz"
interface MealComponentProps {
  meal: Meal
}
const MealComponent: React.FC<MealComponentProps> = ({ meal }) => {
  return (
    <>
      <div
        className="relative md:m-3 p-2 shadow-md hover:shadow-md hover:bg-gray-100 rounded-lg bg-white overflow-hidden"
        onClick={() => Router.push(`meals/${meal.id}`)}
      >
        <img
          src="https://picsum.photos/id/247/2106/1404"
          alt=""
          //   width={220}
          //   height={200}
          className="w-full h-40 md:h-56 object-cover rounded-sm"
        />
        <div className="absolute top-0 ml-2 p-2 mt-4 bg-secondary-100 text-secondary-200 text-xs uppercase font-bold rounded-full">
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
        <div className="p-2">
          <h3 className="font-medium text-gray-600 text-lg my-2 uppercase">{`${meal.title}`}</h3>
          <p className="text-justify">{`${meal.description}`}</p>
          <div className="mt-5">
            <a
              href=""
              className="hover:bg-gray-700 rounded-full py-2 px-3 font-semibold hover:text-white bg-gray-400 text-gray-100"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
export default MealComponent
