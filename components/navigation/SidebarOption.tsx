"use client";

import Link from "next/link";

import { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: IconType;
  active: IconType;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarOption = ({
  icon: Icon,
  active: ActiveIcon,
  label,
  href,
  isActive,
}: NavItemProps) => {
  return (
    <div
      className={cn(
        "h-12 w-full px-4 py-3 items-center rounded-md",
        isActive
          ? "bg-stone-100 dark:bg-stone-800"
          : "hover:bg-stone-100 dark:hover:bg-stone-800"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-2">
          {isActive ? (
            <ActiveIcon className="h-6 w-6" />
          ) : (
            <Icon className="h-6 w-6" />
          )}
          <span className="mt-1">{label}</span>
        </div>
      </Link>
    </div>
  );
};

export default SidebarOption;
