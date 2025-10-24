import { getCommentsByTaskId } from "@/api/comments/read-comments";
import { useQuery } from "@tanstack/react-query";

export const useCommentsData = (taskId: string) => {
  return useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => getCommentsByTaskId(taskId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
