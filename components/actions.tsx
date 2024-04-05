"use client";

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { BsCartFill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { ThemeDropDown } from "@/components/theme/ThemeDropDown";
import {
  FetchCollection,
  FetchDocuments,
  LoginWithGoogle,
} from "@/Hooks/Hooks";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { Hint } from "./hint";
import { useUserStore } from "@/store/user";
import useCart from "@/store/use-cart";

export const Actions = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const cart = useCart();

  const { data, loading } = FetchDocuments("driver");

  const userData = data.filter((driver: any) => driver.email === user.email!);
  const userDetails = userData[0];

  // console.log(userData[0]);

  return (
    <div className="flex items-center justify-end gap-x-2 ml-2 lg:ml-0">
      {!user.isLoggedIn && <LoginWithGoogle />}
      <div
        className="space-x-2 flex relative cursor-pointer"
        onClick={() => router.push("/cart")}
      >
        <div className="py-1 px-3.5">
          <AiOutlineShoppingCart className="h-8 w-8" />
          <div className="absolute h-[26px] text-center p-2 bg-blue-500 text-black pl-2 -top-2 right-0 w-[26px] rounded-full text-2xl flex items-center justify-center">
            {cart.items.length}
          </div>
        </div>
      </div>
      {user.isLoggedIn && (
        <div className="flex items-center gap-x-4">
          <Hint label="Source Dashboard">
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-primary"
              asChild
            >
              <Link href={`/user/${user.id}`}>
                <MdDashboard className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>
            </Button>
          </Hint>
          {!loading && userDetails && (
            <>
              {userDetails.role === "driver" && (
                <Hint label="Driver's Dashboard">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary"
                    asChild
                  >
                    <Link href={`/driver/${user.id}`}>
                      <MdDashboard className="h-5 w-5 lg:mr-2" />
                      <span className="hidden lg:block">Driver</span>
                    </Link>
                  </Button>
                </Hint>
              )}
            </>
          )}
          <UserAvatar />
        </div>
      )}
      <ThemeDropDown />
    </div>
  );
};
