import { randomUUID } from 'crypto';
import { Comment } from './comment.entity';
import { AuditLog } from './audit-log.entity';

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum EnumStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export interface TaskProps {
  title: string;
  description: string;
  comments?: Comment[];
  auditLog?: AuditLog[];
  deadline: Date;
  priority: TaskPriority;
  status: EnumStatus;
  responsibles: Array<string>;
  authorId: string;
}

export class Task {
  private _id: string;
  private props: TaskProps;

  private constructor(props: TaskProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
  }

  public static create(props: TaskProps, id?: string): Task {
    return new Task(props, id);
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get comments(): Comment[] {
    return (this.props.comments as Comment[]) || '';
  }

  set comments(value: Comment[]) {
    this.props.comments = value;
  }

  get deadline(): Date {
    return this.props.deadline;
  }

  set deadline(value: Date) {
    this.props.deadline = value;
  }

  get priority(): string {
    return this.props.priority;
  }

  set priority(value: TaskPriority) {
    this.props.priority = value;
  }

  get status(): string {
    return this.props.status;
  }

  set status(value: EnumStatus) {
    this.props.status = value;
  }

  get responsibles(): Array<string> {
    return this.props.responsibles;
  }

  set responsibles(value: Array<string>) {
    this.props.responsibles = value;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  set authorId(value: string) {
    this.props.authorId = value;
  }

  get auditLog(): AuditLog[] {
    return this.props.auditLog ?? [];
  }

  set auditLog(value: AuditLog[]) {
    this.props.auditLog = value;
  }
}
