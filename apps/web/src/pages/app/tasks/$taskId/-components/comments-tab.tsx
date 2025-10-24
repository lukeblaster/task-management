import CreateCommentForm from "@/components/forms/comments/create-comment-form";
import { Button } from "@/components/ui/button";
import { CommentCard } from "@/components/ui/message-card";
import { useCommentsData } from "@/hooks/use-comments";
import type { CommentProps } from "@/types/Comment";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";

export const CommentsTab = () => {
  const { taskId } = useParams({
    from: "/app/tasks/$taskId/",
  });

  const { page, size } = useSearch({
    from: "/app/tasks/$taskId/",
  });

  const navigate = useNavigate({
    from: "/app/tasks/$taskId",
  });
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
  return (
    <div className="py-3 space-y-2">
      <h2 className="font-semibold text-lg">Comentários</h2>
      <CreateCommentForm />
      <div className="flex flex-col px-0.5 py-3 gap-3 max-h-[calc(30%-30px)] overflow-auto">
        {comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
      <div className="flex ml-auto justify-end space-x-2">
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
  );
};
