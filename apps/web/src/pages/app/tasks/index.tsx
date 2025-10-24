import { createFileRoute, useSearch } from "@tanstack/react-router";
import CreateTaskForm from "@/components/forms/tasks/create-task-form";
import { useTasksData } from "@/hooks/use-tasks";
import type { TaskProps } from "@/types/Task";
import { TaskTable } from "@/components/table/tasks-table";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (!data?.data)
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

  const { data: tasks, total } = data;

  return (
    <div className="flex flex-col">
      <div className="lg:px-1 lg:py-6">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-md lg:text-xl font-semibold px-0.5">
            Minhas tarefas
          </h1>
          <CreateTaskForm />
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
