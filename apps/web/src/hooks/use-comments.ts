import { getCommentsByTaskId } from "@/api/comments/read-comments";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCommentsData = (taskId: string, page: number, size: number) => {
  return useQuery({
    queryKey: ["comments", taskId, { page, size }],
    queryFn: () => getCommentsByTaskId(taskId, page, size),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
