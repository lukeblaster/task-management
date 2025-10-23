import { getTasks } from "@/api/tasks/read-tasks";
import { useQuery } from "@tanstack/react-query";

export const useTasksData = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
