import { Injectable } from '@nestjs/common';

import { AuditLogRepository } from 'src/domain/repositories/audit-log.repository';
import { AuditLog } from 'src/domain/entities/audit-log.entity';

export interface CreateAuditLogUseCaseRequest {
  message: string;
  authorId: string;
  taskId: string;
}

@Injectable()
export class CreateAuditLogUseCase {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async execute({
    message,
    authorId,
    taskId,
  }: CreateAuditLogUseCaseRequest): Promise<AuditLog> {
    const auditLog = AuditLog.create({
      message,
      authorId,
      taskId,
    });

    await this.auditLogRepository.create(auditLog);

    return auditLog;
  }
}
