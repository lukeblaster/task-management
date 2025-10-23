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
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateUserForm from "../forms/users/update-user-form";

export default function UsersCard() {
  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardContent className="flex flex-col justify-center items-center text-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarFallback>LS</AvatarFallback>
            </Avatar>
            <div>
              <p>Lucas Soares</p>
              <span className="text-muted-foreground text-sm">Usuário</span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dados do usuário</DialogTitle>
        </DialogHeader>
        <UpdateUserForm />
      </DialogContent>
    </Dialog>
  );
}
