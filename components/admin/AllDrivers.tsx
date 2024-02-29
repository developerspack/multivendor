"use client";

import { Suspense } from "react";

import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { FetchDocuments } from "@/Hooks/Hooks";
import Heading from "@/components/heading";
import { DriverColumns } from "./DriverColumn";

const AllDrivers = () => {
  const { data } = FetchDocuments("driver");

  return (
    <div className="px-4 mt-4">
      <div className="flex items-center justify-between pb-8">
        <Heading title={"View Drivers"} description={"View and Edit Drivers"} />
      </div>

      <Suspense fallback={<ItemsSkeleton />}>
        <DataTable columns={DriverColumns} data={data} filterKey={"name"} />
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
export default AllDrivers;
