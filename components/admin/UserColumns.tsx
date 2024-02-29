"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownFill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import Moment from "react-moment";
import UserActions from "./UserActions";

export const UserColumn: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "User Id",
  },
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
    accessorKey: "email",
    header: "User email",
  },
  {
    accessorKey: "role",
    header: "User role",
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <Moment fromNow>{row.getValue("createdAt")}</Moment>,
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActions data={row.original} Name="users" />,
  },
];
