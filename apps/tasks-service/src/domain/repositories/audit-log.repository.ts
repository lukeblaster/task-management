import { PaginationResult } from 'src/type/pagination-result.interface';
import { AuditLog } from '../entities/audit-log.entity';

export abstract class AuditLogRepository {
  abstract findByTaskId(
    taskId: string,
    page: number,
    size: number,
  ): Promise<PaginationResult<AuditLog> | null>;
  abstract create(AuditLog: AuditLog): Promise<void>;
}
