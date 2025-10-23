import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkSquare03Icon,
  DateTimeIcon,
  TaskDaily01Icon,
} from "@hugeicons/core-free-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full w-full flex flex-col bg-background space-y-12">
      <div className="flex justify-between px-24 py-6">
        <div className="flex gap-1.5 font-bold text-xl items-center">
          <HugeiconsIcon icon={CheckmarkSquare03Icon} /> Taskly
        </div>
        <div>Perfil</div>
      </div>
      <div className="px-24">
        <h1 className="text-xl font-semibold mb-3">Suas tarefas</h1>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((task) => (
            <Card className="">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <p>Comprar pão</p>
                  <div className="flex gap-1 justify-center items-end text-xs">
                    <HugeiconsIcon icon={DateTimeIcon} size={18} />
                    24/10/2025
                  </div>
                </CardTitle>
                <CardDescription>A padaria fecha às 17 horas</CardDescription>
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
                    3 participantes
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
