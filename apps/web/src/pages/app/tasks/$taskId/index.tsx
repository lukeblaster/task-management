import CreateCommentForm from "@/components/forms/comments/create-comment-form";
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
import { CommentCard } from "@/components/ui/message-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCommentsData } from "@/hooks/use-comments";
import { useTaskData } from "@/hooks/use-tasks-id";
import type { CommentProps } from "@/types/Comment";
import { type TaskProps } from "@/types/Task";
import {
  ArrowLeft01Icon,
  Delete03FreeIcons,
  Edit01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";

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
  const { page, size } = useSearch({
    from: "/app/tasks/$taskId/",
  });
  const navigate = useNavigate({
    from: "/app/tasks/$taskId",
  });

  const task: TaskProps = useTaskData(taskId).data?.data;
  const data: {
    data: CommentProps[];
    lastPage: number;
    page: string;
    total: number;
  } = useCommentsData(taskId, page, size).data?.data;

  if (!data) return <div>Carregando</div>;

  const { data: comments, lastPage } = data;

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  const handleSizeChange = (newSize: number) => {
    navigate({
      search: (prev) => ({ ...prev, size: newSize, page: 1 }), // volta pra 1
    });
  };

  console.log(page, size);

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
            <div className="mt-2 flex flex-col gap-2">
              <p className="flex gap-1 text-sm font-semibold">
                Prioridade:{" "}
                <div className="w-fit bg-green-400 text-green-800 font-semibold px-2 py-0.5 rounded-full text-xs">
                  • {task?.priority}
                </div>
              </p>
              <p className="flex gap-1 text-sm font-semibold">
                Status:{" "}
                <div className="w-fit bg-yellow-400 text-yellow-800 font-semibold px-2 py-0.5 rounded-full text-xs">
                  • {task?.status}
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
          <h2 className="font-semibold text-lg">Comentários</h2>
          <CreateCommentForm />
          <div className="flex flex-col px-0.5 py-3 gap-3 max-h-[calc(30%-30px)] overflow-auto">
            {comments?.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
          <div className="flex ml-auto space-x-2">
            <Select
              defaultValue={`${size}`}
              onValueChange={(e) => {
                handleSizeChange(Number(e));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha um valor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <Button
              disabled={page <= 1}
              variant={"outline"}
              className="w-fit"
              onClick={() => handlePageChange(page - 1)}
            >
              Anterior
            </Button>
            <Button
              disabled={lastPage == page}
              variant={"outline"}
              className="w-fit"
              onClick={() => handlePageChange(page + 1)}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
