"use client";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/store/user";

const UserAvatar = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const LogOut = () => {
    signOut(auth);
    setUser({
      isLoggedIn: false,
      id: "",
      email: "",
      Name: "",
      photo: "",
      role: "",
    });
    localStorage.setItem(
      "auth",
      JSON.stringify({
        isLoggedIn: false,
        id: "",
        email: "",
        Name: "",
        photo: "",
        role: "",
      })
    );
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user.photo ? user.photo : ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user.role === "admin" && (
          <DropdownMenuItem onClick={() => router.push(`/admin/${user?.id}`)}>
            Admin
          </DropdownMenuItem>
        )}
        <Separator />
        <DropdownMenuItem onClick={() => router.push("/cart")}>
          Cart
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={() => router.push("/myorders")}>
          My Order
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={LogOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
