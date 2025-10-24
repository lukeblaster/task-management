import DeleteTaskForm from "@/components/forms/tasks/delete-task-form";
import UpdateTaskForm from "@/components/forms/tasks/update-task-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaskData } from "@/hooks/use-tasks-id";
import { EnumStatusMap, TaskPriorityMap, type TaskProps } from "@/types/Task";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { CommentsTab } from "./-components/comments-tab";
import { AuditLogTab } from "./-components/audit-log-tab";
import { Skeleton } from "@/components/ui/skeleton";

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

  const { data: response, isFetched } = useTaskData(taskId);

  if (!isFetched)
    return (
      <div className="flex flex-col">
        <div className="lg:px-1 lg:py-6">
          <div className="flex justify-between items-end mb-6">
            <h1 className="text-md lg:text-xl font-semibold px-0.5">
              <Skeleton className="h-6 w-24" />
            </h1>
            <Skeleton className="h-12 w-24" />
          </div>
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    );

  const task: TaskProps = response?.data;
  const date = new Date(task?.deadline).toLocaleDateString();

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
            <UpdateTaskForm task={task} />
            <DeleteTaskForm taskId={`${task?.id}`} />
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
