import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { AuditLogProps } from "@/types/AuditLog";

export const AuditLogCard = ({ auditLog }: { auditLog: AuditLogProps }) => {
  const createdAtDate = new Date(auditLog.createdAt).toLocaleDateString();
  return (
    <>
      <div key={auditLog.id} className="flex gap-1 items-top">
        <Avatar className="h-8">
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">
            Usuário
            <span className="border-b border-dashed border-muted-foreground italic">
              {` ${auditLog.authorId}`}
            </span>
            {` ${auditLog.message}`}
          </p>
          <p className="text-sm text-muted-foreground">{createdAtDate}</p>
        </div>
      </div>
    </>
  );
};
