import { instance as axios } from "../axios";

export const getTasks = async (page: number, size: number) => {
  const response = await axios.get(`/tasks?page=${page}&size=${size}`);

  return response;
};
