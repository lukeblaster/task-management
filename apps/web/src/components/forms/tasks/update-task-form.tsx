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

export const updateTaskSchema = z.object({
  // id: z.uuid(),
  title: z
    .string({ message: "Valor é obrigatório" })
    .min(5, "Título deve ser maior"),
  description: z.string().optional(),
  status: z.enum(EnumStatus, "Escolha uma opção válida"),
  priority: z.enum(TaskPriority, "Escolha uma opção válida"),
  deadline: z.string("Escolha uma data válida"),
  responsibles: z.array(z.string()).min(1, "Selecione ao menos 1 responsável"),
});

type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

const usersMock = ["1", "2", "3"];

export default function UpdateTaskForm({ task }: { task: TaskProps }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateTaskInput>({
    resolver: standardSchemaResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      responsibles: task.responsibles,
    },
  });

  const defaultDate = new Date(task.deadline).toISOString().split("T")[0];

  const responsiblesValue = watch("responsibles");

  function toggleId(id: string) {
    const currentResponsibles = responsiblesValue;

    if (currentResponsibles.includes(id)) {
      setValue(
        "responsibles",
        currentResponsibles.filter((i) => i !== id)
      );
    } else {
      setValue("responsibles", [...currentResponsibles, id]);
    }
  }

  const onSubmit: SubmitHandler<UpdateTaskInput> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Título</FieldLabel>
              <input
                className="input"
                {...register("title")}
                defaultValue={task.title}
                placeholder="Fazer relatório"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>Descrição</FieldLabel>
              <input
                {...register("description")}
                defaultValue={task.description}
                placeholder="Lembrar de adicionar as metas..."
                className="max-h-[150px] input"
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>Data de entrega</FieldLabel>
              <input
                className="input"
                type="date"
                {...register("deadline")}
                defaultValue={defaultDate}
                placeholder="Fazer relatório"
              />
              {errors.deadline && (
                <span className="text-red-500 text-sm">
                  {errors.deadline.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select
                {...register("status")}
                defaultValue={`${task.status}`}
                onValueChange={(val) =>
                  setValue("status", val as EnumStatus, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value={EnumStatus.TODO}>Pendente</SelectItem>
                  <SelectItem value={EnumStatus.IN_PROGRESS}>
                    Em andamento
                  </SelectItem>
                  <SelectItem value={EnumStatus.REVIEW}>Em revisão</SelectItem>
                  <SelectItem value={EnumStatus.DONE}>Concluído</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <span className="text-red-500 text-sm">
                  {errors.status?.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>Prioridade</FieldLabel>
              <Select
                {...register("priority")}
                defaultValue={`${task.priority}`}
                onValueChange={(val) =>
                  setValue("priority", val as TaskPriority, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma prioridade" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value={TaskPriority.LOW}>Baixa</SelectItem>
                  <SelectItem value={TaskPriority.MEDIUM}>Médida</SelectItem>
                  <SelectItem value={TaskPriority.HIGH}>Alta</SelectItem>
                  <SelectItem value={TaskPriority.URGENT}>Urgente</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <span className="text-red-500 text-sm">
                  {errors.status?.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>Responsáveis</FieldLabel>
              <ParticipantsPicker
                inputValue={responsiblesValue}
                users={usersMock ?? []}
                toggleId={toggleId}
              />
              {errors.responsibles && (
                <span className="text-red-500 text-sm">
                  {errors.responsibles.message}
                </span>
              )}
            </Field>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
