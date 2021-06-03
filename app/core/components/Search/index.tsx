const Search = ({}) => {
  return (
    <>
      <div className="relative ">
        <input
          type="search"
          className="bg-purple-white shadow rounded-lg border-0 p-2 sm:w-100 focus:focus-none"
          placeholder="Search meals...."
          name="search"
          autoComplete="off"
        />
      </div>
    </>
  )
}
export default Search
