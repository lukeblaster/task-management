import { randomUUID } from 'crypto';
import { Comment } from './comment.entity';
import { Task } from './task.entity';

export interface AuditLogProps {
  task?: Task;
  taskId: string;
  message: string;
  authorId: string;
  createdAt?: Date;
}

export class AuditLog {
  private _id: string;
  private props: AuditLogProps;

  private constructor(props: AuditLogProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public static create(props: AuditLogProps, id?: string): AuditLog {
    return new AuditLog(props, id);
  }

  get id(): string {
    return this._id;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  set authorId(value: string) {
    this.props.authorId = value;
  }

  get message(): string {
    return this.props.message;
  }

  set message(value: string) {
    this.props.authorId = value;
  }

  get createdAt(): Date {
    return this.props.createdAt as Date;
  }

  get task(): Task | null {
    return (this.props.task as Task) || null;
  }

  set task(value: Task) {
    this.props.task = value;
  }

  get taskId(): string {
    return this.props.taskId;
  }

  set taskId(value: string) {
    this.props.taskId = value;
  }
}
