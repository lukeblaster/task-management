import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

export const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string().min(5).max(200),
  deadline: z.date(),
  responsibles: z.array(z.string()),
});

type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

export default function CreateTaskForm() {
  const { register, handleSubmit } = useForm<CreateTaskInput>();

  const onSubmit: SubmitHandler<CreateTaskInput> = async () => {
    const response = () => {};

    return response;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Título</FieldLabel>
              <Input
                id="title"
                {...register("title")}
                placeholder="Fazer relatório"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="description"
                  placeholder="Lembrar de adicionar as metas..."
                  className="min-h-[150px]"
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="deadline">Data de entrega</FieldLabel>
              <Input
                id="deadline"
                type="date"
                {...register("deadline")}
                placeholder="Fazer relatório"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="responsibles">Responsáveis</FieldLabel>
              <Input
                id="responsibles"
                {...register("responsibles")}
                placeholder="Selecione os responsáveis"
              />
            </Field>
            <DialogFooter>
              <Button variant="secondary">Cancelar</Button>
              <Button>Enviar</Button>
            </DialogFooter>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
