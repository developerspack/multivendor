"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownFill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import CellActions from "@/components/seller/CellActions";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="text-center">
        <img
          src={row.getValue("imageUrl")}
          alt="itemImage"
          className="h-10 w-10 rounded-md"
        />
      </div>
    ),
  },

  {
    accessorKey: "Name",
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
    accessorKey: "Price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-[20px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "Ksh",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  // Name: "",
  // Brand: "",
  // imageUrl: "",
  // otherImageUrl: [],
  // Price: 0,
  // Discount: 0,
  // Category: "",
  // Description: "",
  {
    accessorKey: "Discount",
    header: "Discount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "Ksh",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Bid",
  //   cell: ({ row }) => <Moment fromNow>{row.getValue("createdAt")}</Moment>,
  // },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} Name="products" />,
  },
];
