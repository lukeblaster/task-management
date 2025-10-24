import { instance as axios } from "../axios";

export const getCommentsByTaskId = async (
  taskId: string,
  page: number,
  size: number
) => {
  const response = await axios.get(
    `/tasks/${taskId}/comments?page=${page}&size=${size}`
  );

  return response;
};
