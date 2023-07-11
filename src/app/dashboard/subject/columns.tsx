"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { CellAction } from "./cell-action";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubjectColumn = {
    id: string
    name: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  }
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<SubjectColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => <Link href={`/dashboard/subject/${row.original.id}`}>{row.original.name}</Link>
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
  },
  {
    id: "actions",
    cell: ({ row }) =>  <CellAction data={row.original} />
  },
]
