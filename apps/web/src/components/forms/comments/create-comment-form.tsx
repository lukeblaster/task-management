import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { createComment } from "@/api/comments/create-comment";

export const createCommentSchema = z.object({
  taskId: z.uuid(),
  content: z
    .string({ message: "Informe um valor válido" })
    .min(1, "Comentário não pode ser nulo"),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;

export default function CreateCommentForm() {
  const { taskId } = useParams({
    from: "/app/tasks/$taskId/",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCommentInput>({
    resolver: standardSchemaResolver(createCommentSchema),
    defaultValues: {
      taskId: taskId,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
      queryClient.invalidateQueries({ queryKey: ["tasks", taskId] });
      reset();
    },
    onError: (response) => {
      console.log(response);
    },
  });

  const onSubmit: SubmitHandler<CreateCommentInput> = async (data) => {
    console.log(data);
    await mutation.mutateAsync({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <div className="flex gap-2">
                <input
                  placeholder="Seu comentário..."
                  className="input"
                  {...register("content")}
                />
                <Button className="ml-auto">Enviar</Button>
              </div>
              {errors.content && (
                <span className="text-red-500 text-sm">
                  {errors.content.message}
                </span>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
