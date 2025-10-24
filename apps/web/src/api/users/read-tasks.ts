import { instance as axios } from "../axios";

export const getUsers = async () => {
  const response = await axios.get(`/auth/list`);

  return response;
};
