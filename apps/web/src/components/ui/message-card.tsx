import type { CommentProps } from "@/types/Comment";
import { Avatar, AvatarFallback } from "./avatar";
import { Card, CardContent, CardFooter } from "./card";

export const CommentCard = ({ comment }: { comment: CommentProps }) => {
  const createdAtDate = new Date(comment.createdAt).toLocaleDateString();
  return (
    <>
      <div className="flex gap-1 items-top">
        <Avatar className="h-8">
          <AvatarFallback>
            {comment?.authorName[0].toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <span className="text-sm font-semibold">{comment.authorName}</span>
          <Card className="flex flex-col gap-0 bg-card py-1 px-0 *:px-4! *:py-1! w-fit">
            <CardContent className="px-1">
              <p className="text-sm">{comment.content}</p>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              {createdAtDate}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
