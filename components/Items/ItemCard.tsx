"use client";

import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { FetchDocument } from "@/Hooks/Hooks";

interface ItemCardProps {
  data: any;
}

export const ItemCard = ({ data }: ItemCardProps) => {
  const { document } = FetchDocument("users", data.userId);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Ksh",
  }).format(data.Price);
  return (
    <Link href={`/${data.id}`}>
      <div className="h-full w-full space-y-4 bg-stone-900/10 dark:bg-stone-50/10 rounded-md">
        <div className="aspect-video relative rounded-md cursor-pointer">
          <Image
            src={data.imageUrl}
            fill
            alt="Thumbnail"
            className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
          />
        </div>
        <div className="flex gap-x-3 p-2">
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold text-base hover:text-blue-500">
              {data.Name}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-blue-300">Price:</span>
              <span className="text-base font-bold">{formatted}</span>
            </div>
            <Link
              href={`/user/${data.userId}`}
              className="truncate font-semibold"
            >
              <span className="font-medium text-lg text-blue-500">
                Seller:{" "}
              </span>{" "}
              <span className="hover:underline underline-offset-3">
                {document.name}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <div className="group aspect-video relative rounded-xl cursor-pointer">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex gap-x-3">
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
