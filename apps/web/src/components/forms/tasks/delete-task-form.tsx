import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/api/tasks/delete-task";
import { useNavigate } from "@tanstack/react-router";

export const deleteTaskSchema = z.object({
  id: z.string({ message: "Valor é obrigatório" }),
});

export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;

export default function DeleteTaskForm({ taskId }: { taskId: string }) {
  const navigate = useNavigate();
  const { handleSubmit } = useForm<DeleteTaskInput>({
    resolver: standardSchemaResolver(deleteTaskSchema),
    defaultValues: {
      id: taskId,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate({
        to: "/app/tasks",
      });
    },
    onError: (response) => {
      console.log(response);
    },
  });

  const onSubmit: SubmitHandler<DeleteTaskInput> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" variant="destructive">
                Excluir
              </Button>
            </DialogFooter>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
