"use client";

import Link from "next/link";
import { MdDashboard } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { ThemeDropDown } from "@/components/theme/ThemeDropDown";
import { LoginWithGoogle } from "@/Hooks/Hooks";
import UserAvatar from "./UserAvatar";
import { Hint } from "./hint";

export const Actions = () => {
  const user = {
    isLoggedIn: true,
    id: 212,
  };

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user.isLoggedIn && <LoginWithGoogle />}
      {user.isLoggedIn && (
        <div className="flex items-center gap-x-4">
          <Hint label="Auctioneer's Dashboard">
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
          <UserAvatar />
        </div>
      )}
      <ThemeDropDown />
    </div>
  );
};
