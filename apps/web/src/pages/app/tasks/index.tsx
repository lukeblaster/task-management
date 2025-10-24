import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddCircleIcon } from "@hugeicons/core-free-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTaskForm from "@/components/forms/tasks/create-task-form";
import { useTasksData } from "@/hooks/use-tasks";
import type { TaskProps } from "@/types/Task";
import { TaskTable } from "@/components/table/tasks-table";

export const Route = createFileRoute("/app/tasks/")({
  component: RouteComponent,
  validateSearch: (search) => ({
    page: Number(search.page ?? 1),
    size: Number(search.size ?? 10),
  }),
});

function RouteComponent() {
  const { page, size } = useSearch({
    from: "/app/tasks/",
  });
  const data: {
    data: TaskProps[];
    lastPage: number;
    page: string;
    total: number;
  } = useTasksData(page, size).data?.data;

  if (!data) return <div>Carregando...</div>;

  const { data: tasks, total } = data;

  return (
    <div className="flex flex-col">
      <div className="lg:px-1 lg:py-6">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-md lg:text-xl font-semibold px-0.5">
            Minhas tarefas
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <HugeiconsIcon icon={AddCircleIcon} strokeWidth={2} /> Criar
                tarefa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastre uma nova tarefa</DialogTitle>
                <DialogDescription>
                  Preencha os campos e envie as informações
                </DialogDescription>
              </DialogHeader>
              <CreateTaskForm />
            </DialogContent>
          </Dialog>
        </div>
        <TaskTable
          data={tasks}
          rowCount={total}
          pageCount={Number(page)}
          size={size}
        />
      </div>
    </div>
  );
}
