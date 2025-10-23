import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { ParticipantsPicker } from "./set-participants";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import type { TaskProps } from "@/types/Task";

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum EnumStatus {
  TODO = "TO DO",
  IN_PROGRESS = "IN PROGRESS",
  REVIEW = "REVIEW",
  DONE = "DONE",
}

export const deleteTaskSchema = z.object({
  id: z.string({ message: "Valor é obrigatório" }),
});

type UpdateTaskInput = z.infer<typeof deleteTaskSchema>;

const usersMock = ["1", "2", "3"];

export default function DeleteTaskForm({ task }: { task: TaskProps }) {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTaskInput>({
    resolver: standardSchemaResolver(deleteTaskSchema),
    defaultValues: {
      id: "task.id",
    },
  });

  const onSubmit: SubmitHandler<UpdateTaskInput> = async (data) => {
    console.log(data);
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
