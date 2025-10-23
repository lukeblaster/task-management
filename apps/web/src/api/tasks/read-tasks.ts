import { instance as axios } from "../axios";

export const getTasks = async () => {
  const response = await axios.get("/tasks");

  return response;
};
