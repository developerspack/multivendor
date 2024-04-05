"use client";

import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ItemCard, ResultCardSkeleton } from "./ItemCard";
import { FetchDocuments } from "@/Hooks/Hooks";
import CategoryNav from "../CategoryNav";

export const Item = () => {
  const { data, loading } = FetchDocuments("products");
  const [cat, setCat] = useState("All");

  const FilteredProducts = data.filter(
    (product: any) => product.Category === cat
  );

  return (
    <>
      {loading ? (
        <ResultsSkeleton />
      ) : (
        <>
          <CategoryNav setCat={setCat} cat={cat} />
          {FilteredProducts.length === 0 && cat !== "All" && (
            <h1 className="flex items-center justify-center text-xl font-bold  my-4">
              Empty Playlist
            </h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 my-4">
            {cat === "All" ? (
              <>
                {data.map((result: any) => (
                  <ItemCard key={result.id} data={result} />
                ))}
              </>
            ) : (
              <>
                {FilteredProducts.map((result: any) => (
                  <ItemCard key={result.id} data={result} />
                ))}
              </>
            )}
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
