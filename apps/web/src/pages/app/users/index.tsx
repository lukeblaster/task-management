import CreateUserForm from "@/components/forms/users/create-user-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import UsersCard from "@/components/users/users-card";
import { useUsersData } from "@/hooks/use-users";
import type { UserProps } from "@/types/User";
import { AddCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/app/users/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Usuários | Taskly",
      },
    ],
  }),
});

function RouteComponent() {
  const { data: response, isFetched } = useUsersData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!isFetched)
    return (
      <div className="flex flex-col">
        <div className="lg:px-1 lg:py-6">
          <div className="flex justify-between items-end mb-6">
            <h1 className="text-md lg:text-xl font-semibold px-0.5">
              <Skeleton className="h-6 w-24" />
            </h1>
            <Skeleton className="h-12 w-24" />
          </div>
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    );

  const users: UserProps[] = response?.data;

  return (
    <div className="flex flex-col">
      <div className="lg:px-1 lg:py-6">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-md lg:text-xl font-semibold px-0.5">
            Usuários do sistema
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <HugeiconsIcon icon={AddCircleIcon} strokeWidth={2} /> Criar
                usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastre um novo usuário</DialogTitle>
                <DialogDescription>
                  Preencha os campos e envie as informações
                </DialogDescription>
              </DialogHeader>
              <CreateUserForm setIsDialogOpen={setIsDialogOpen} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {users?.map((user) => (
            <UsersCard key={user?.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
