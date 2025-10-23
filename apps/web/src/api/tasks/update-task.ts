import type { UpdateTaskInput } from "@/components/forms/tasks/update-task-form";
import { instance as axios } from "../axios";

export const updateTask = async ({
  id,
  title,
  description,
  deadline,
  responsibles,
  priority,
  status,
}: UpdateTaskInput) => {
  const response = await axios.put(
    `/tasks/${id}`,
    JSON.stringify({
      title,
      description,
      deadline,
      responsibles,
      priority,
      status,
    })
  );

  return response;
};
