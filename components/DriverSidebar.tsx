"use client";

import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdCreateNewFolder, MdOutlineCreateNewFolder } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import { useUserStore } from "@/store/user";
import SidebarOption from "@/components/navigation/SidebarOption";
import { FetchDocuments } from "@/Hooks/Hooks";

const DriverSidebar = () => {
  const { user } = useUserStore();
  const { data, loading } = FetchDocuments("driver");
  const userData = data.filter((driver: any) => driver.email === user.email!);
  const userDetails = userData[0];

  const routes = [
    {
      label: "Profile",
      href: `/driver/${user?.id}`,
      icon: CgProfile,
      active: FaUserCircle,
    },
    {
      label: "Edit profile",
      href: `/driver/${user?.id}/${!loading && userDetails.id}`,
      icon: MdOutlineCreateNewFolder,
      active: MdCreateNewFolder,
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

export default DriverSidebar;
