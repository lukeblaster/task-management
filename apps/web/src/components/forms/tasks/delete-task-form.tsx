import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/api/tasks/delete-task";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete03FreeIcons } from "@hugeicons/core-free-icons";

export const deleteTaskSchema = z.object({
  id: z.string({ message: "Valor é obrigatório" }),
});

export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;

export default function DeleteTaskForm({ taskId }: { taskId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsDialogOpen(false);
      navigate({
        to: "/app/tasks",
        search: {
          page: 1,
          size: 10,
        },
      });
    },
    onError: (response) => {
      toast.error(response.message);
    },
  });

  const onSubmit: SubmitHandler<DeleteTaskInput> = async (data) => {
    toast.promise(mutation.mutateAsync(data), {
      loading: "Deletando tarefa...",
      success: (data) => `${data.data.message}`,
      error: (err) => {
        if (axios.isAxiosError(err)) {
          return err.response?.data?.message ?? "Erro desconhecido";
        }
        return "Erro ao deletar tarefa.";
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>
          <HugeiconsIcon icon={Delete03FreeIcons} strokeWidth={2} /> Deletar
          tarefa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja deletar a tarefa?</DialogTitle>
          <DialogDescription>Esta ação é irreversível</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={mutation.isPending}
                  >
                    Excluir
                  </Button>
                </DialogFooter>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
