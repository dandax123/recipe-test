import { useSearchValues } from "app/stores/useSearchValues"
import { useRouter } from "blitz"

const Search = ({}) => {
  const { searchValue, updateSearch } = useSearchValues((x) => x)
  const router = useRouter()

  const handleSearchChange = (e, value) => {
    // console.log(value)
    updateSearch(e.target.value)
  }
  const handleSubmit = (e) => {
    e?.preventDefault()
    if (searchValue === "") return
    router.push("/meals/search")
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative ">
          <input
            className="bg-purple-white shadow rounded-lg border-1 outline-none border-black p-2 md:w-full focus:focus-none w-full"
            placeholder="Search meals...."
            name="search"
            value={searchValue}
            autoComplete="off"
            onChange={handleSearchChange}
          />
          <div
            className="absolute right-0 rounded-r-lg bottom-0 bg-black text-white p-3 cursor-pointer"
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white font-bold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </form>
    </>
  )
}
export default Search
