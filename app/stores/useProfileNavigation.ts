import create from "zustand"
import { combine } from "zustand/middleware"
const defaultActive = {
  meals: false,
  favorites: false,
  account: false,
}
export const useProfileNavigation = create(
  combine(
    {
      nav: {
        ...defaultActive,
        meals: true,
      },
    },
    (set, get) => ({
      updateActive: (x: { [index: string]: boolean }) =>
        set({
          nav: {
            ...defaultActive,
            ...x,
          },
        }),
    })
  )
)
