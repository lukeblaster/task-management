import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { DateTimeIcon } from "@hugeicons/core-free-icons";
import { Link } from "@tanstack/react-router";
import type { TaskProps } from "@/types/Task";

export default function TaskCard({ task }: { task: TaskProps }) {
  const deadline = new Date(task.deadline).toLocaleDateString();
  return (
    <Link to={`/app/tasks/$taskId`} params={{ taskId: task.id }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <p className="text-sm">{task.title}</p>
            <div className="flex gap-1 justify-center items-end text-xs">
              <HugeiconsIcon icon={DateTimeIcon} size={18} />
              {deadline}
            </div>
          </CardTitle>
          <CardDescription className="text-sm">
            {task.description}
          </CardDescription>
          <CardContent className="px-0">
            <div className="flex gap-2">
              <div className="w-fit bg-green-400 text-green-800 font-semibold px-2 py-0.5 rounded-full text-xs">
                • {task.priority}
              </div>
              <div className="w-fit bg-yellow-400 text-yellow-800 font-semibold px-2 py-0.5 rounded-full text-xs">
                • {task.status}
              </div>
            </div>
            <p className="mt-2 text-xs font-semibold text-foreground border-b border-dashed w-fit border-b-accent italic">
              {task.responsibles?.length} responsáveis
            </p>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
}
