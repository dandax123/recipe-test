import deleteMeal from "app/modules/meals/mutations/deleteMeal"
import { useMutation, useRouter } from "blitz"

const Modal = ({ open, setOpen, mealId }) => {
  const [delMeal] = useMutation(deleteMeal)
  const router = useRouter()
  const handleDelete = async () => {
    await delMeal({ id: mealId })
    router.push("/profile")
  }
  return (
    <>
      {open ? (
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-100 bg-opacity-60">
          <div className="bg-white rounded-lg w-1/2">
            <div className="flex flex-col items-start p-4">
              <div className="flex items-center w-full">
                <div className="text-gray-900 font-medium text-lg">Delete meal</div>
                <svg
                  className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </div>
              <hr></hr>
              <div className="">Are you sure you want to delete this meal ?</div>
              <hr></hr>
              <div className="ml-auto">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => setOpen(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
export default Modal
