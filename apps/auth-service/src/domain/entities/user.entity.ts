import { randomUUID } from 'crypto';

export interface UserProps {
  username: string;
  email: string;
  password: string;
  hashedRt?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  private constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }

  set username(value: string) {
    this.props.username = value;
    this.props.updatedAt = new Date();
  }

  get hashedRt(): string {
    return this.props.hashedRt || '';
  }

  set hashedRt(value: string) {
    this.props.hashedRt = value;
    this.props.updatedAt = new Date();
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt as Date;
  }
  get updatedAt(): Date {
    return this.props.updatedAt as Date;
  }
}
