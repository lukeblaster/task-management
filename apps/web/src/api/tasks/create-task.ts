import { instance as axios } from "../axios";
import type { CreateTaskInput } from "@/components/forms/tasks/create-task-form";

export const createTask = async ({
  title,
  description,
  deadline,
  responsibles,
  status,
  priority,
}: CreateTaskInput) => {
  const response = await axios.post(
    "/tasks",
    JSON.stringify({
      title,
      description,
      deadline,
      responsibles,
      status,
      priority,
    })
  );

  return response;
};
