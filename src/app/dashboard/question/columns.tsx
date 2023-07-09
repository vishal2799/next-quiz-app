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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type QuestionColumn = {
    id: string
    description: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctOption: number;
    isActive: boolean;
    subject: string;
    subjectId: string;
  }


export const columns: ColumnDef<QuestionColumn>[] = [
   {
        accessorKey: "subject",
        header: "Subject",
   },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "option1",
    header: "Option 1",
  },
  {
    accessorKey: "option2",
    header: "Option 2",
  },
  {
    accessorKey: "option3",
    header: "Option 3",
  },
  {
    accessorKey: "option4",
    header: "Option 4",
  },
  {
    accessorKey: "correctOption",
    header: "Correct Option",
  },
  {
    id: "actions",
    cell: ({ row }) =>  <CellAction data={row.original} />
  },
]
