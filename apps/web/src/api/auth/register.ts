import { instance as axios } from "../axios";
import type { CreateUserInput } from "@/components/forms/users/create-user-form";

export const signUp = async ({
  username,
  email,
  password,
  password_confirm,
}: CreateUserInput) => {
  const response = await axios.post(
    "/auth/register",
    JSON.stringify({
      username,
      email,
      password,
      password_confirm,
    })
  );

  return response;
};
