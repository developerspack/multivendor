"use client";

import { Suspense } from "react";

import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { FetchDocuments } from "@/Hooks/Hooks";
import Heading from "@/components/heading";
import { columns } from "@/components/columns";

const AllProducts = () => {
  const { data } = FetchDocuments("products");

  return (
    <div className="px-4 mt-4">
      <div className="flex items-center justify-between pb-8">
        <Heading
          title={"View Products"}
          description={"View and Edit Products"}
        />
      </div>

      <Suspense fallback={<ItemsSkeleton />}>
        <DataTable columns={columns} data={data} filterKey={"Name"} />
      </Suspense>
    </div>
  );
};

const ItemsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
    </div>
  );
};
export default AllProducts;
