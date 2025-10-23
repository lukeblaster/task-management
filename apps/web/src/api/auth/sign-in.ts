import type { LoginInput } from "@/pages/_auth/login";
import { instance as axios } from "../axios";

export const signIn = async ({ email, password }: LoginInput) => {
  const credentials = btoa(`${email}:${password}`);
  const response = await axios.post(
    "/auth/login",
    {},
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }
  );

  return response;
};
