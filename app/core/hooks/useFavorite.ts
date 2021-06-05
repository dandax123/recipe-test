import getFavorite from "app/modules/meals/queries/getFavorite"

import { invoke } from "blitz"

export const getFavoriteStatus = async (id: number) => {
  const isFavorite = await invoke(getFavorite, { id })
  //   const [isFavorite, { setQueryData, refetch }] = useQuery()
  return { isFavorite }
}
