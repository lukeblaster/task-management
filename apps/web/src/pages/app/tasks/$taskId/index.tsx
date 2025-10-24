import DeleteTaskForm from "@/components/forms/tasks/delete-task-form";
import UpdateTaskForm from "@/components/forms/tasks/update-task-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaskData } from "@/hooks/use-tasks-id";
import {
  EnumStatus,
  EnumStatusMap,
  TaskPriorityMap,
  type TaskProps,
} from "@/types/Task";
import {
  ArrowLeft01Icon,
  Delete03FreeIcons,
  Edit01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { CommentsTab } from "./-components/comments-tab";
import { AuditLogTab } from "./-components/audit-log-tab";

export const Route = createFileRoute("/app/tasks/$taskId/")({
  component: RouteComponent,
  validateSearch: (search) => ({
    page: Number(search.page ?? 1),
    size: Number(search.size ?? 10),
  }),
});

function RouteComponent() {
  const { taskId } = useParams({
    from: "/app/tasks/$taskId/",
  });

  const task: TaskProps = useTaskData(taskId).data?.data;
  const date = new Date(task?.deadline).toLocaleDateString();
  console.log(task);

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
              {task?.title}
            </h1>
            <h3 className="text-sm text-muted-foreground">
              {task?.description}
            </h3>
            <div className="mt-2 flex gap-2 capitalize">
              <p className="flex flex-col gap-1 text-sm font-semibold">
                <div className="w-fit bg-zinc-300 text-zinc-700 font-semibold px-2 py-0.5 rounded-full text-xs">
                  {task?.priority && TaskPriorityMap[task?.priority]}
                </div>
              </p>
              <p className="flex flex-col gap-1 text-sm font-semibold">
                <div className="w-fit bg-zinc-300 text-zinc-700 font-semibold px-2 py-0.5 rounded-full text-xs">
                  {task?.status && EnumStatusMap[task?.status]}
                </div>
              </p>
              <p className="flex flex-col gap-1 text-sm font-semibold">
                <div className="w-fit bg-zinc-300 text-zinc-700 font-semibold px-2 py-0.5 rounded-full text-xs">
                  {date}
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
                  <HugeiconsIcon icon={Delete03FreeIcons} strokeWidth={2} />{" "}
                  Deletar tarefa
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
                <DeleteTaskForm taskId={`${task?.id}`} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="my-8 flex flex-col gap-2">
          <Tabs defaultValue="comments">
            <TabsList>
              <TabsTrigger value="comments">Comentários</TabsTrigger>
              <TabsTrigger value="auditLog">Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="comments">
              <CommentsTab />
            </TabsContent>
            <TabsContent value="auditLog">
              <AuditLogTab auditLogs={task?.auditLogs} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
