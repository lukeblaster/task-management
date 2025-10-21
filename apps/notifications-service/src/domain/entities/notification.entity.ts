import { randomUUID } from 'crypto';

export interface NotificationProps {
  title: string;
  body: string;
  userId: string;
  taskId: string;
  read?: boolean;
  createdAt?: Date;
}

export class NotificationEntity {
  private _id: string;
  private props: NotificationProps;

  private constructor(props: NotificationProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public static create(
    props: NotificationProps,
    id?: string,
  ): NotificationEntity {
    return new NotificationEntity(props, id);
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

  get body(): string {
    return this.props.body;
  }

  set body(value: string) {
    this.props.body = value;
  }

  get userId(): string {
    return this.props.userId;
  }

  set userId(value: string) {
    this.props.userId = value;
  }

  get taskId(): string {
    return this.props.taskId;
  }

  set taskId(value: string) {
    this.props.taskId = value;
  }

  get read(): boolean {
    return this.props.read ?? false;
  }

  set read(value: boolean) {
    this.props.read = value;
  }

  get createdAt(): Date {
    return this.props.createdAt as Date;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }
}
