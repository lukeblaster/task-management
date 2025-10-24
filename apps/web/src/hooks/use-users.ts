import { getUsers } from "@/api/users/read-tasks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useUsersData = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
