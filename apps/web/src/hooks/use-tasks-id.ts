import { getTaskById } from "@/api/tasks/read-tasks-id";
import { useQuery } from "@tanstack/react-query";

export const useTaskData = (id: string) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTaskById(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
