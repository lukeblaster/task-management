import { Injectable } from '@nestjs/common';

import { PaginationResult } from 'src/type/pagination-result.interface';
import { AuditLogRepository } from 'src/domain/repositories/audit-log.repository';
import { AuditLog } from 'src/domain/entities/audit-log.entity';

export interface ReadAuditLogUseCaseRequest {
  taskId: string;
  page: number;
  size: number;
}

@Injectable()
export class ReadAuditLogUseCase {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async execute({
    taskId,
    page,
    size,
  }: ReadAuditLogUseCaseRequest): Promise<PaginationResult<AuditLog> | null> {
    const auditLogs = await this.auditLogRepository.findByTaskId(
      taskId,
      page,
      size,
    );

    return auditLogs;
  }
}
