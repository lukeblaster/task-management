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
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth/sign-in";
import { useAuthStore } from "@/stores/useAuthStore";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof LoginSchema>;

function RouteComponent() {
  const updateUser = useAuthStore().updateUser;
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginInput>();
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (response) => {
      updateUser(response.data.user);
      navigate({
        to: "/app/tasks",
        search: {
          page: 1,
          size: 10,
        },
      });
    },
    onError: (response) => {
      console.log(response);
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    await mutation.mutateAsync({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <div className="h-screen w-screen flex bg-background justify-center items-center">
      <Card className="border-accent flex flex-col py-12 w-3/4 md:1/4 lg:w-1/3 2xl:w-1/4 rounded-xl justify-center blur-out-2xl">
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
                    <input
                      id="user"
                      className="input"
                      {...register("email")}
                      placeholder="E-mail"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <input
                      type="password"
                      className="input"
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
