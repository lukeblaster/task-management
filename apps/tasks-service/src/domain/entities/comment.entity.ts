import { randomUUID } from 'crypto';
import { Task } from './task.entity';

export interface CommentProps {
  content: string;
  task: Task;
  taskId: string;
  authorId: string;
  createdAt?: Date;
}

export class Comment {
  private _id: string;
  private props: CommentProps;

  private constructor(props: CommentProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public static create(props: CommentProps, id?: string): Comment {
    return new Comment(props, id);
  }

  get id(): string {
    return this._id;
  }

  get content(): string {
    return this.props.content;
  }

  set content(value: string) {
    this.props.content = value;
  }

  get task(): Task {
    return this.props.task;
  }

  set task(value: Task) {
    this.props.task = value;
  }

  get taskId(): string {
    return this.props.taskId;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  get createdAt(): Date {
    return this.props.createdAt as Date;
  }
}
