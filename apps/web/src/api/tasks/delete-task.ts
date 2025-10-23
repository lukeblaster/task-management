import { instance as axios } from "../axios";
import type { DeleteTaskInput } from "@/components/forms/tasks/delete-task-form";

export const deleteTask = async ({ id }: DeleteTaskInput) => {
  const response = await axios.delete(`/tasks/${id}`);

  return response;
};
