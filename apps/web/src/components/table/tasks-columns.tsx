"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

import {
  EnumStatus,
  EnumStatusMap,
  TaskPriority,
  TaskPriorityMap,
  type TaskProps,
} from "@/types/Task";
import { Link } from "@tanstack/react-router";

// function getTextColor(bgColor: string) {
//   // Converte hex para RGB e calcula o brilho
//   const hex = bgColor.replace("#", "");
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);
//   const brightness = (r * 299 + g * 587 + b * 114) / 1000;

//   return brightness > 128 ? "text-black" : "text-white";
// }

export function getTasksColumns(): ColumnDef<TaskProps>[] {
  //   banks: BankAccount[],
  //   categories: Category[]
  return [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Título
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className={`capitalize text-ellipsis overflow-hidden max-w-36`}>
            {row.getValue("title")}
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descrição
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className={`capitalize text-ellipsis overflow-hidden max-w-36`}>
            {row.getValue("description")}
          </div>
        );
      },
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data de entrega
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("deadline")).toLocaleDateString();
        return (
          <div className={`capitalize text-ellipsis overflow-hidden max-w-36`}>
            {date}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        return (
          <div className={`capitalize text-ellipsis overflow-hidden max-w-36`}>
            {EnumStatusMap[row.getValue("status") as unknown as EnumStatus]}
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      filterFn: "arrIncludesSome",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prioridade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className={`capitalize text-ellipsis overflow-hidden max-w-36`}>
            {
              TaskPriorityMap[
                row.getValue("priority") as unknown as TaskPriority
              ]
            }
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Ações",
      cell: ({ row }) => {
        const taskId = row.getValue("id");
        return (
          <Link
            to="/app/tasks/$taskId"
            search={{
              page: 1,
              size: 10,
            }}
            params={{
              taskId: taskId as unknown as string,
            }}
          >
            <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
          </Link>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => {},
      cell: () => {},
    },
  ];
}
