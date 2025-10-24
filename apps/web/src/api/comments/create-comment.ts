import type { CreateCommentInput } from "@/components/forms/comments/create-comment-form";
import { instance as axios } from "../axios";

export const createComment = async ({
  taskId,
  authorName,
  content,
}: CreateCommentInput) => {
  const response = await axios.post(
    `/tasks/${taskId}/comments`,
    JSON.stringify({
      content,
      authorName,
    })
  );

  return response;
};
