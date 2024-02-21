"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ItemCard, ResultCardSkeleton } from "./ItemCard";
import { FetchDocuments } from "@/Hooks/Hooks";
import { response } from "@/response";

export const Item = () => {
  const { data, loading } = FetchDocuments("products");
  console.log(data);

  return (
    <>
      {loading ? (
        <ResultsSkeleton />
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">
            Items we think you will like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            {data.map((result: any) => (
              <ItemCard key={result.id} data={result} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export const ResultsSkeleton = () => {
  return (
    <>
      <Skeleton className="h-8 w-[290px] mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};
