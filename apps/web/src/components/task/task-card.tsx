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

export default function TaskCard({ taskId }: { taskId: string }) {
  return (
    <Link to={`/app/tasks/$taskId`} params={{ taskId }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <p className="text-sm">Comprar pão</p>
            <div className="flex gap-1 justify-center items-end text-xs">
              <HugeiconsIcon icon={DateTimeIcon} size={18} />
              24/10/2025
            </div>
          </CardTitle>
          <CardDescription className="text-sm">
            A padaria fecha às 17 horas
          </CardDescription>
          <CardContent className="px-0">
            <div className="flex gap-2">
              <div className="w-fit bg-green-400 text-green-800 font-semibold px-2 py-0.5 rounded-full text-xs">
                • baixa
              </div>
              <div className="w-fit bg-yellow-400 text-yellow-800 font-semibold px-2 py-0.5 rounded-full text-xs">
                • pendente
              </div>
            </div>
            <p className="mt-2 text-xs font-semibold text-foreground border-b border-dashed w-fit border-b-accent italic">
              3 responsáveis
            </p>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
}
