export interface AuditLogProps {
  id: string;
  message: string;
  authorId: string;
  taskId: string;
  createdAt: Date;
}
