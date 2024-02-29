import Image from "next/image";
import Link from "next/link";

import { Search } from "./search";
import { Actions } from "../actions";

const Header = () => {
  return (
    <div className="bg-[#dddddd] dark:bg-[#191919] p-4 justify-between flex sticky z-40 top-0">
      <Link href="/">
        <div className="flex items-center gap-x-4 hover:opacity-75 transition">
          <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
            <Image src="/favicon.ico" alt="auction" height="35" width="35" />
          </div>
          <div className="hidden lg:block">
            <p className="text-lg font-semibold">MultiVendor</p>
          </div>
        </div>
      </Link>
      <Search />
      <Actions />
    </div>
  );
};

export default Header;
