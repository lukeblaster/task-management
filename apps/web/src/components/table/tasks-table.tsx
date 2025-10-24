"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// import { BankAccount } from "@/types/bank-account";
// import { Category } from "@/types/category";
import {
  EnumStatus,
  EnumStatusMap,
  TaskPriority,
  TaskPriorityMap,
  type TaskProps,
} from "@/types/Task";
import { getTasksColumns } from "./tasks-columns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddCircleHalfDotIcon } from "@hugeicons/core-free-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Checkbox } from "../ui/checkbox";
import { useNavigate } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TransactionTableProps {
  data: TaskProps[];
  rowCount: number;
  pageCount: number;
  size: number;
  //   banks: BankAccount[];
  //   categories: Category[];
}

export function TaskTable({
  data,
  rowCount,
  pageCount,
  size,
  //   banks,
  //   categories,
}: TransactionTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const navigate = useNavigate({
    from: "/app/tasks",
  });

  const handleStatusCheckboxChange = (value: string) => {
    setSelectedStatuses((prev) => {
      const newSelection = prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value];

      table.getColumn("status")?.setFilterValue(newSelection);

      return newSelection;
    });
  };

  const handlePriorityCheckboxChange = (value: string) => {
    setSelectedPriorities((prev) => {
      const newSelection = prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value];

      table.getColumn("priority")?.setFilterValue(newSelection);

      return newSelection;
    });
  };

  const columns = getTasksColumns() as unknown as ColumnDef<TaskProps>[];
  //   const columns = getTransactionColumns(
  //     banks,
  //     categories
  //   ) as unknown as ColumnDef<TransactionColumnsProps>[];

  const table = useReactTable<TaskProps>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    rowCount: rowCount,
    filterFns: {},
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination: {
        pageIndex: pageCount - 1,
        pageSize: size,
      },
    },
    globalFilterFn: "includesString",
  });

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  const handleSizeChange = (newSize: number) => {
    navigate({
      search: (prev) => ({ ...prev, size: newSize, page: 1 }), // volta pra 1
    });
  };

  return (
    <div className="h-full">
      {/* Cabeçalho */}
      <div className="flex items-center py-4">
        <div className="flex gap-3 w-full">
          <Input
            placeholder="Pesquise por título, descrição..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <Popover>
            <PopoverTrigger>
              <Button variant={"outline"}>
                <HugeiconsIcon icon={AddCircleHalfDotIcon} /> Status
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder="Digite para procurar..." />
                <CommandList>
                  <CommandEmpty>Nenhum resultado encontrador.</CommandEmpty>
                  <CommandGroup className="*:capitalize">
                    <CommandItem className="capitalize">
                      <Checkbox
                        checked={selectedStatuses.includes(EnumStatus.TODO)}
                        onCheckedChange={() =>
                          handleStatusCheckboxChange(EnumStatus.TODO)
                        }
                      />
                      {EnumStatusMap.TODO}
                    </CommandItem>
                    <CommandItem>
                      <Checkbox
                        checked={selectedStatuses.includes(
                          EnumStatus.IN_PROGRESS
                        )}
                        onCheckedChange={() =>
                          handleStatusCheckboxChange(EnumStatus.IN_PROGRESS)
                        }
                      />
                      {EnumStatusMap.IN_PROGRESS}
                    </CommandItem>
                    <CommandItem>
                      <Checkbox
                        checked={selectedStatuses.includes(EnumStatus.REVIEW)}
                        onCheckedChange={() =>
                          handleStatusCheckboxChange(EnumStatus.REVIEW)
                        }
                      />
                      {EnumStatusMap.REVIEW}
                    </CommandItem>
                    <CommandItem>
                      <Checkbox
                        checked={selectedStatuses.includes(EnumStatus.DONE)}
                        onCheckedChange={() =>
                          handleStatusCheckboxChange(EnumStatus.DONE)
                        }
                      />
                      {EnumStatusMap.DONE}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>
              <Button variant={"outline"}>
                <HugeiconsIcon icon={AddCircleHalfDotIcon} /> Prioridade
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder="Digite para procurar..." />
                <CommandList>
                  <CommandEmpty>Nenhum resultado encontrador.</CommandEmpty>
                  <CommandGroup className="*:capitalize">
                    <CommandItem className="capitalize">
                      <Checkbox
                        checked={selectedPriorities.includes(TaskPriority.LOW)}
                        onCheckedChange={() =>
                          handlePriorityCheckboxChange(TaskPriority.LOW)
                        }
                      />
                      {TaskPriorityMap.LOW}
                    </CommandItem>
                    <CommandItem>
                      <Checkbox
                        checked={selectedPriorities.includes(
                          TaskPriority.MEDIUM
                        )}
                        onCheckedChange={() =>
                          handlePriorityCheckboxChange(TaskPriority.MEDIUM)
                        }
                      />
                      {TaskPriorityMap.MEDIUM}
                    </CommandItem>
                    <CommandItem>
                      <Checkbox
                        checked={selectedPriorities.includes(TaskPriority.HIGH)}
                        onCheckedChange={() =>
                          handlePriorityCheckboxChange(TaskPriority.HIGH)
                        }
                      />
                      {TaskPriorityMap.HIGH}
                    </CommandItem>
                    <CommandItem>
                      <Checkbox
                        checked={selectedPriorities.includes(
                          TaskPriority.URGENT
                        )}
                        onCheckedChange={() =>
                          handlePriorityCheckboxChange(TaskPriority.URGENT)
                        }
                      />
                      {TaskPriorityMap.URGENT}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-3 mr-2.5 hidden">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-neutral-50">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize hover:bg-neutral-200 cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id.toLocaleUpperCase()}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Conteúdo */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-1 font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Rodapé */}
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div> */}
        <Select
          defaultValue={`${size}`}
          onValueChange={(e) => {
            handleSizeChange(Number(e));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escolha um valor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              handlePageChange(pageCount - 1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              handlePageChange(pageCount + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
