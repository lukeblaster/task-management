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
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type LoginInput = z.infer<typeof LoginSchema>;

function RouteComponent() {
  const { register, handleSubmit } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async () => {
    const response = () => {};

    return response;
  };
  return (
    <div className="h-full w-full flex bg-background justify-center items-center ">
      <Card className="border-accent flex flex-col py-12 w-3/4 lg:w-1/4 rounded-xl justify-center blur-out-2xl">
        <CardHeader>
          <CardTitle>Bem-vindo de volta ao Taskly</CardTitle>
          <CardDescription>
            Informe seu e-mail para entrar na conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="user">E-mail</FieldLabel>
                    <Input
                      id="user"
                      {...register("email")}
                      placeholder="E-mail"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Input
                      type="password"
                      {...register("password")}
                      id="password"
                      placeholder="Senha"
                      required
                    />
                  </Field>
                  <Field>
                    <Button>Fazer login</Button>
                    <FieldDescription className="text-center">
                      Não tem conta? <Link to={"/register"}>Registre-se</Link>
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
