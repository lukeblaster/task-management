import { createFileRoute } from "@tanstack/react-router";
import TaskCard from "@/components/task/task-card";
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

export const Route = createFileRoute("/app/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <div className="lg:px-24">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-md lg:text-xl font-semibold px-0.5">
            Suas tarefas
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <TaskCard key={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
