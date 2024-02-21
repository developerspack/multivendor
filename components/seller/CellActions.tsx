"use client";

import { AiFillCopy, AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { useUserStore } from "@/store/user";

interface CellActionProps {
  data: any;
  Name: string;
}

const CellActions = ({ data, Name }: CellActionProps) => {
  const router = useRouter();
  const { user } = useUserStore();

  const OnCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${Name} id Copied to the Clipboard`);
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
          onClick={() => router.push(`/user/${user?.id}/${data.id}`)}
        >
          <BiEdit className="h-4 w-4 mr-2 text-green-400" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            HandleDelete(data.id, Name, data.imageUrl, data.otherImageUrl)
          }
        >
          <AiFillDelete className="h-4 w-4 mr-2 text-red-500" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
