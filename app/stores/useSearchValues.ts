import create from "zustand"
import { combine } from "zustand/middleware"
// const immer = (config) => (set, get, api) => config((fn) => set(produce(fn)), get, api)

export const useSearchValues = create(
  combine(
    {
      searchValue: "",
    },
    (set) => ({
      updateSearch: (x: string) => set({ searchValue: x }),
    })
  )
)
