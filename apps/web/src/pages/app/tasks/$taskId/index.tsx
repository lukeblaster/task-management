import CreateTaskForm from "@/components/forms/tasks/create-task-form";
import DeleteTaskForm from "@/components/forms/tasks/delete-task-form";
import UpdateTaskForm from "@/components/forms/tasks/update-task-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCard } from "@/components/ui/message-card";
import { Textarea } from "@/components/ui/textarea";
import { EnumStatus, TaskPriority, type TaskProps } from "@/types/Task";
import {
  AddCircleIcon,
  ArrowLeft01Icon,
  Edit01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/tasks/$taskId/")({
  component: RouteComponent,
});

const task: TaskProps = {
  title: "Comprar pão",
  description: "Padaria fecha às 17 horas",
  deadline: new Date(),
  status: EnumStatus.TODO,
  priority: TaskPriority.LOW,
  responsibles: ["1"],
};

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <div className="lg:px-1 lg:py-6">
        <Link to=".." className="flex gap-0.5 text-sm items-center w-fit">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={22} />
          <span>Voltar</span>
        </Link>
        <div className="flex justify-between my-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-md lg:text-xl px-0.5 font-semibold">
              Comprar pão
            </h1>
            <h3 className="text-sm text-muted-foreground">
              A padaria fecha às 17 horas
            </h3>
            <div className="mt-2 flex flex-col gap-2">
              <p className="flex gap-1 text-sm font-semibold">
                Prioridade:{" "}
                <div className="w-fit bg-green-400 text-green-800 font-semibold px-2 py-0.5 rounded-full text-xs">
                  • baixa
                </div>
              </p>
              <p className="flex gap-1 text-sm font-semibold">
                Status:{" "}
                <div className="w-fit bg-yellow-400 text-yellow-800 font-semibold px-2 py-0.5 rounded-full text-xs">
                  • pendente
                </div>
              </p>
            </div>
          </div>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} /> Atualizar
                  tarefa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Atualize a tarefa</DialogTitle>
                  <DialogDescription>
                    Preencha os campos e salve as alterações
                  </DialogDescription>
                </DialogHeader>
                <UpdateTaskForm task={task} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"destructive"}>
                  <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} /> Deletar
                  tarefa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Tem certeza que deseja deletar a tarefa?
                  </DialogTitle>
                  <DialogDescription>
                    Esta ação é irreversível
                  </DialogDescription>
                </DialogHeader>
                <DeleteTaskForm task={task} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="my-8 flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Comentários</h2>
          <div className="flex gap-2">
            <input placeholder="Seu comentário..." className="input"></input>
            <Button className="ml-auto">Enviar</Button>
          </div>
          <div className="flex flex-col px-0.5 py-3 gap-3 max-h-[calc(30%-30px)] overflow-auto">
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
          </div>
        </div>
      </div>
    </div>
  );
}
