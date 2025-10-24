import { getTasks } from "@/api/tasks/read-tasks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useTasksData = (page: number, size: number) => {
  return useQuery({
    queryKey: ["tasks", page, size],
    queryFn: () => getTasks(page, size),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
