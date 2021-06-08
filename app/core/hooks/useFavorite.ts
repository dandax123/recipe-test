import getFavorite from "app/modules/meals/queries/getFavorite"

import { invoke } from "blitz"

export const getFavoriteStatus = async (id: number) => {
  const { isFavorite, isOwner } = await invoke(getFavorite, { id })
  // console.log(isOwner)
  //   const [isFavorite, { setQueryData, refetch }] = useQuery()
  return { isFavorite, isOwner }
}
