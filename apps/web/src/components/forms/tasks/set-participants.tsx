"use client";

import { Check, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ParticipantsPickerProps {
  users: string[];
  inputValue: string[];
  toggleId: (id: string) => void;
}

export function ParticipantsPicker({
  users,
  inputValue,
  toggleId,
}: ParticipantsPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="input">
          {inputValue?.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {inputValue?.map((userId) => {
                const user = users.find((u) => u === userId);
                if (!user) return null;

                return (
                  <Badge key={user} variant="secondary">
                    {user}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={() => toggleId(user)}
                    />
                  </Badge>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-left text-muted-foreground">
              Escolher participantes...
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Buscar participante..." />
            <CommandList>
              <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>

              <CommandGroup>
                {users.map((user) => {
                  const selected = inputValue?.includes(user);

                  return (
                    <CommandItem key={user} onSelect={() => toggleId(user)}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {user}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
