"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownFill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import ChooseDriverActions from "./ChooseDriverActions";

export const ChooseDriverColumns: ColumnDef<any>[] = [
  {
    accessorKey: "photo",
    header: "Image",
    cell: ({ row }) => (
      <div className="text-center">
        <img
          src={row.getValue("photo")}
          alt="itemImage"
          className="h-10 w-10 rounded-md"
        />
      </div>
    ),
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-[20px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-[20px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price per km
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "Ksh",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Choose Driver",
    cell: ({ row }) => <ChooseDriverActions data={row.original} />,
  },
];
