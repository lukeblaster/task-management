export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export const TaskPriorityMap = {
  LOW: "baixa",
  MEDIUM: "médio",
  HIGH: "alta",
  URGENT: "urgente",
} as const;

export type TaskPriorityKey = keyof typeof TaskPriorityMap;
export type TaskPriorityValue = (typeof TaskPriorityMap)[TaskPriorityKey];

export enum EnumStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  DONE = "DONE",
}

export const EnumStatusMap = {
  TODO: "pendente",
  IN_PROGRESS: "em progresso",
  REVIEW: "em revisão",
  DONE: "concluída",
} as const;

export type EnumStatusKey = keyof typeof EnumStatusMap;
export type EnumStatusValue = (typeof EnumStatusMap)[EnumStatusKey];

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  authorId?: string;
  deadline: Date;
  priority?: TaskPriority;
  status?: EnumStatus;
  comments?: string[];
  responsibles?: Array<string>;
}
