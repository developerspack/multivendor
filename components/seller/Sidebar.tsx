"use client";

import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdCreateNewFolder, MdOutlineCreateNewFolder } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiProductHuntFill, RiProductHuntLine } from "react-icons/ri";
import SidebarOption from "./SidebarOption";
import { useUserStore } from "@/store/user";

const Sidebar = () => {
  const { user } = useUserStore();
  const routes = [
    {
      label: "Profile",
      href: `/user/${user?.id}`,
      icon: CgProfile,
      active: FaUserCircle,
    },
    {
      label: "Create Products",
      href: `/user/${user?.id}/new`,
      icon: MdOutlineCreateNewFolder,
      active: MdCreateNewFolder,
    },
    {
      label: "View Products",
      href: `/user/${user?.id}/viewProducts`,
      icon: RiProductHuntLine,
      active: RiProductHuntFill,
    },
  ];
  const pathname = usePathname();

  return (
    <div className="ml-10 hidden md:flex fixed h-[700px] bg-[#dddddd] dark:bg-[#191919] rounded-md">
      <ul className="space-y-2 px-2 mt-4 lg:pt-0">
        {routes.map((route) => (
          <li className="w-full" key={route.href}>
            <SidebarOption
              label={route.label}
              icon={route.icon}
              active={route.active}
              href={route.href}
              isActive={pathname === route.href}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
