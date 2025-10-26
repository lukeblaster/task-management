import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "@/api/auth/register";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Registro | Taskly",
      },
    ],
  }),
});

const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Nome deve ter no mínimo 6 caracteres." }),
    email: z.string().email({ message: "E-mail inválido." }),
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

type RegisterInput = z.infer<typeof RegisterSchema>;

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: standardSchemaResolver(RegisterSchema),
  });

  const navigate = useNavigate({
    from: "/register",
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate({
        to: "/login",
      });
      toast.success(response.data.message);
    },
    onError: () => {
      toast.error("Não foi possível criar o usuário. Tente novamente depois!");
    },
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    await mutation.mutateAsync({ ...data });
  };

  return (
    <div className="h-screen w-full flex bg-background justify-center items-center ">
      <Card className="border-accent flex flex-col py-12 w-3/4 md:1/4 lg:w-1/3 2xl:w-1/4 rounded-xl justify-center blur-out-2xl">
        <CardHeader>
          <CardTitle>Comece a usar o Taskly</CardTitle>
          <CardDescription>Preencha os campos e crie sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
              <Field>
                <Button type="submit">Criar conta</Button>
                <FieldDescription className="text-center">
                  Já tem conta? <Link to="/login">Faça login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
