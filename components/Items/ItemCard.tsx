"use client";

import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { FetchDocument } from "@/Hooks/Hooks";
import { MouseEventHandler } from "react";
import useCart from "@/store/use-cart";
import { Button } from "../ui/button";

interface ItemCardProps {
  data: any;
}

export const ItemCard = ({ data }: ItemCardProps) => {
  const { document } = FetchDocument("users", data.userId);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Ksh",
  }).format(data.Price);

  const cart = useCart();
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    const product = {
      ...data,
      qty: 1,
    };
    cart.addItem(product);
  };
  return (
    <div className="h-full w-full space-y-4 bg-stone-900/10 dark:bg-stone-50/10 rounded-md">
      <Link href={`/${data.id}`}>
        <div className="aspect-video relative rounded-md cursor-pointer">
          <Image
            src={data.imageUrl}
            fill
            alt="Thumbnail"
            className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
          />
        </div>
      </Link>

      <div>
        <div className="flex gap-x-3 p-2">
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold text-base hover:text-blue-500">
              {data.Name}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 text-base font-semibold">
                Price:
              </span>
              <span className="font-medium">
                {formatted} per {data.Measurement}
              </span>
            </div>
            <Link
              href={`/sellerProfile/${data.userId}`}
              className="truncate font-semibold"
            >
              <span className="font-medium text-lg text-blue-500">
                Source:{" "}
              </span>{" "}
              <span className="hover:underline underline-offset-3">
                {document.name}
              </span>
            </Link>
            <span className="font-medium text-lg text-blue-500">
              Location:
              <span className="text-white ml-2">{data.Location}</span>
            </span>
          </div>
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-600 mb-4 float-right mr-4"
          onClick={onAddToCart}
        >
          Add To Cart
        </Button>
      </div>
    </div>
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
