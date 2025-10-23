import CreateTaskForm from "@/components/forms/tasks/create-task-form";
import CreateUserForm from "@/components/forms/users/create-user-form";
import TaskCard from "@/components/task/task-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UsersCard from "@/components/users/users-card";
import { AddCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <div className="lg:px-1 lg:py-6">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-md lg:text-xl font-semibold px-0.5">
            Suas usuários
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <HugeiconsIcon icon={AddCircleIcon} strokeWidth={2} /> Criar
                usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastre um novo usuário</DialogTitle>
                <DialogDescription>
                  Preencha os campos e envie as informações
                </DialogDescription>
              </DialogHeader>
              <CreateUserForm />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <UsersCard key={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
