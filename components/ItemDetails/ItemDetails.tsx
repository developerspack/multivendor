"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

import ImageCarousel from "./ImageCarousel";
import { useUserStore } from "@/store/user";
import { FetchDocument } from "@/Hooks/Hooks";

const ItemDetails = ({
  id,
  Name,
  Brand,
  imageUrl,
  otherImageUrl,
  Price,
  Discount,
  Category,
  userId,
  Description,
}: any) => {
  const router = useRouter();

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Ksh",
  }).format(Price);

  const { user } = useUserStore();
  const { document } = FetchDocument("users", userId);

  // console.log(user);

  return (
    <div className="w-full">
      {/* btns bid edit */}
      <div className="flex gap-4 float-right -mt-8 lg:mt-0 z-50">
        {user.id === userId && (
          <Link
            href={`/user/${user?.id}/${id}`}
            className="flex items-center justify-center gap-1 font-medium p-3
            cursor-pointer text-black bg-green-400 hover:bg-green-500 rounded-lg"
          >
            <FaEdit className="h-5 w-5" />
            <span>Edit</span>
          </Link>
        )}
      </div>
      <div className="block lg:flex gap-5">
        <div className="w-full block mt-10 lg:mt-0">
          {/* image */}
          <div className="lg:h-[480px] p-2 bg-[#313030]/10 dark:bg-[#313030] rounded-lg">
            <Image
              src={imageUrl}
              height={500}
              width={500}
              alt={Name}
              className="rounded-lg h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-full">
          {/* name price */}
          <div className="mt-2 space-y-3 lg:pl-3">
            {/* name */}
            <h2 className="text-2xl md:text-3xl line-clamp-1 mb-3">{Name}</h2>
            <Link href={`/user/${userId}`} className="mt-4">
              <span className="font-medium text-lg text-blue-500">
                Auctioneer:{" "}
              </span>{" "}
              <span className="hover:underline underline-offset-3">
                {document.name}
              </span>
            </Link>
            {/* price */}
            <div className="flex items-center gap-2">
              <span className="text-blue-300">Starting Price:</span>
              <span className="text-xl font-bold">{formatted}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pl-4 bg-[#313030]/10 dark:bg-[#313030] p-2 rounded-md overflow-auto">
        <div className="text-lg text-bold">Description:</div>
        <div className="lg:ml-28 ml-2 text-sm lg:text-base">{Description}</div>
      </div>
      <div className="px-7 lg:px-14 pt-4">
        <p className="text-2xl md:text-3xl line-clamp-1">Gallery</p>
        {otherImageUrl && (
          <>
            {otherImageUrl.length !== 0 ? (
              <ImageCarousel otherImages={otherImageUrl} />
            ) : (
              <h3 className="font-bold text-lg">Not Available</h3>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
