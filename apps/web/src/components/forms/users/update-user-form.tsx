import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import type { UserProps } from "@/types/User";

export const updateUserSchema = z.object({
  // id: z.uuid(),
  username: z.string().min(3, "Nome deve ser maior."),
  email: z.email("Informe um e-mail válido"),
  password: z
    .string("Informe uma senha válida.")
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

type UpdateUserInput = z.infer<typeof updateUserSchema>;

export default function UpdateUserForm({ user }: { user: UserProps }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: standardSchemaResolver(updateUserSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  const onSubmit: SubmitHandler<UpdateUserInput> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Nome do usuário</FieldLabel>
              <input
                className="input"
                {...register("username")}
                defaultValue={user.username}
                placeholder="Lucas Silva"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>E-mail</FieldLabel>
              <input
                {...register("email")}
                defaultValue={user.email}
                placeholder="Lembrar de adicionar as metas..."
                className="max-h-[150px] input"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>Nova senha</FieldLabel>
              <input
                className="input"
                type="password"
                {...register("password")}
                placeholder="Nova senha"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
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
