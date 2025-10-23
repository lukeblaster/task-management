export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum EnumStatus {
  TODO = "TO DO",
  IN_PROGRESS = "IN PROGRESS",
  REVIEW = "REVIEW",
  DONE = "DONE",
}

export interface TaskProps {
  title: string;
  description: string;
  comments?: Comment[];
  deadline: Date;
  priority?: TaskPriority;
  status?: EnumStatus;
  responsibles?: Array<string>;
  authorId?: string;
}
