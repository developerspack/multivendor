"use client";

import { AiFillCopy, AiFillDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { toast } from "sonner";
import { Timestamp, doc, updateDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HandleDelete } from "@/Hooks/Hooks";
import { db } from "@/lib/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface CellActionProps {
  data: any;
  Name: string;
}

const UserActions = ({ data, Name }: CellActionProps) => {
  const [role, setRole] = useState(data.role);
  const [isLoading, setLoading] = useState(false);
  const OnCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${Name} id Copied to the Clipboard`);
  };

  const UpdateUserRole = async (role: string) => {
    setRole(role);
    setLoading(true);
    const notification = toast.loading("Updating User Status...");
    try {
      await updateDoc(doc(db, "users", data.id), {
        role: role,
        updatedAt: Timestamp.now().toDate(),
      });
      setLoading(false);
      toast.success("User Role Updated Successfully!", {
        id: notification,
      });
    } catch (error: any) {
      toast.error(error.message || "An error occurred", {
        id: notification,
      });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <FiMoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => OnCopy(data.id)}>
          <AiFillCopy className="h-4 w-4 mr-2" />
          Copy {Name} id
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            HandleDelete(data.id, Name, data.imageUrl, data.otherImageUrl)
          }
        >
          <AiFillDelete className="h-4 w-4 mr-2 text-red-500" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Select
            disabled={isLoading}
            onValueChange={UpdateUserRole}
            value={role}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={data.role} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
