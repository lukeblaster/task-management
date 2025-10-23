import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { ParticipantsPicker } from "./set-participants";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";

export const createTaskSchema = z.object({
  title: z
    .string({ message: "Valor é obrigatório" })
    .min(5, "Título deve ser maior"),
  description: z.string().optional(),
  deadline: z.date("Escolha uma data válida"),
  responsibles: z.array(z.string()).min(1, "Selecione ao menos 1 responsável"),
});

type CreateTaskInput = z.infer<typeof createTaskSchema>;

const usersMock = [
  { id: "1", name: "João" },
  { id: "2", name: "Maria" },
  { id: "3", name: "Carlos" },
];

export default function CreateTaskForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: standardSchemaResolver(createTaskSchema),
    defaultValues: {
      responsibles: [],
    },
  });

  const responsiblesValue = watch("responsibles");

  function toggleId(id: string) {
    const currentResponsibles = responsiblesValue || [];

    if (currentResponsibles.includes(id)) {
      setValue(
        "responsibles",
        currentResponsibles.filter((i) => i !== id),
        {
          shouldValidate: true,
        }
      );
    } else {
      setValue("responsibles", [...currentResponsibles, id], {
        shouldValidate: true,
      });
    }
  }

  const onSubmit: SubmitHandler<CreateTaskInput> = async (data) => {
    console.log("Dados do formulário:", data);
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
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                type="date"
                {...register("deadline", { valueAsDate: true })}
                placeholder="Fazer relatório"
              />
              {errors.deadline && (
                <span className="text-red-500 text-sm">
                  {errors.deadline.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>Responsáveis</FieldLabel>
              <ParticipantsPicker
                inputValue={responsiblesValue}
                users={usersMock}
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
