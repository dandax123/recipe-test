import { useQuery } from "blitz"
import getCurrentUser from "app/modules/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null, {
    refetchInterval: 3000,
  })
  return user
}
