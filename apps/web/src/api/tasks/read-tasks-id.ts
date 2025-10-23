import { instance as axios } from "../axios";

export const getTaskById = async (id: string) => {
  const response = await axios.get(`/tasks/${id}`);

  return response;
};
