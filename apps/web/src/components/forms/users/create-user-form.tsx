import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "@/api/auth/register";
import axios from "axios";

export const createUserSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Nome deve ter no mínimo 6 caracteres." }),
    email: z.email({ message: "E-mail inválido." }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres." }),
    password_confirm: z.string(),
  })
  .superRefine(({ password_confirm, password }, ctx) => {
    if (password_confirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas precisam ser iguais.",
        path: ["password_confirm"],
      });
    }
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;

export default function CreateUserForm({
  setIsDialogOpen,
}: {
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: standardSchemaResolver(createUserSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      if (setIsDialogOpen) setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (response) => {
      toast.error(response.message);
    },
  });

  const onSubmit: SubmitHandler<CreateUserInput> = async (data) => {
    toast.promise(mutation.mutateAsync({ ...data }), {
      loading: "Criando usuário...",
      success: (data) => `${data.data.message}`,
      error: (err) => {
        if (axios.isAxiosError(err)) {
          return err.response?.data?.message ?? "Erro desconhecido";
        }
        return "Erro ao criar usuário.";
      },
    });
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
                placeholder="lucas@gmail.com"
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

            <Field>
              <FieldLabel>Confirme a senha</FieldLabel>
              <input
                className="input"
                type="password"
                {...register("password_confirm")}
                placeholder="Confirme a senha"
              />
              {errors.password_confirm && (
                <span className="text-red-500 text-sm">
                  {errors.password_confirm.message}
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
