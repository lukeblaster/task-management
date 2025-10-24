import { instance as axios } from "../axios";

export const getCommentsByTaskId = async (taskId: string) => {
  const response = await axios.get(`/tasks/${taskId}/comments`);

  return response;
};
