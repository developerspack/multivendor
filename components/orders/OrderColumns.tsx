"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownFill } from "react-icons/ri";
import Moment from "react-moment";

import { Button } from "@/components/ui/button";
import OrderDliveryAction from "./OrderDliveryAction";
import OrderedProducts from "./OrderedProducts";
import ViewDriver from "./ViewDriver";

export const OrderColumn: ColumnDef<any>[] = [
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "driverName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-[20px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Driver Name
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-[20px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">Ksh.{row.getValue("totalPrice")}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <Moment fromNow>{row.getValue("createdAt")}</Moment>,
  },
  {
    id: "actions",
    header: "Delivery Details",
    cell: ({ row }) => <OrderDliveryAction data={row.original} />,
  },
  {
    id: "actions",
    header: "Products",
    cell: ({ row }) => <OrderedProducts data={row.original} />,
  },
  {
    id: "actions",
    header: "View Driver",
    cell: ({ row }) => <ViewDriver data={row.original} />,
  },
];
