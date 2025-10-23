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
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

const RegisterSchema = z
  .object({
    name: z
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
  const { register, handleSubmit } = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    const response = () => {};

    return response;
  };
  return (
    <div className="h-full w-full flex bg-background justify-center items-center ">
      <Card className="border-accent flex flex-col py-12 w-3/4 lg:w-1/4 rounded-xl justify-center blur-out-2xl">
        <CardHeader>
          <CardTitle>Comece a usar o Taskly</CardTitle>
          <CardDescription>Preencha os campos e crie sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <FieldGroup>
              <FieldSet>
                <FieldLegend></FieldLegend>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Nome</FieldLabel>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Lucas Silva"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="user">Usuário</FieldLabel>
                    <Input
                      id="user"
                      {...register("email")}
                      placeholder="lucas@gmail.com"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Input
                      type="password"
                      {...register("password")}
                      id="password"
                      placeholder="Informe sua senha"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Confirme a senha</FieldLabel>
                    <Input
                      type="password"
                      {...register("password")}
                      id="password"
                      placeholder="Confirme sua senha"
                      required
                    />
                  </Field>
                  <Field>
                    <Button>Fazer login</Button>
                    <FieldDescription className="text-center">
                      Já tem conta? <Link to="/login">Faça login</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
