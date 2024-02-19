import Image from "next/image";
import Link from "next/link";

import { Search } from "../navigation/search";
import { Actions } from "../actions";

const Header = () => {
  return (
    <div className="bg-[#dddddd] dark:bg-[#191919] p-4 justify-between flex">
      <Link href="/">
        <div className="flex items-center gap-x-4 hover:opacity-75 transition">
          <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
            <Image src="/favicon.ico" alt="auction" height="35" width="35" />
          </div>
          <div className="hidden lg:block">
            <p className="text-lg font-semibold">MultiVendor</p>
            <p className="text-xs text-muted-foreground">Buy and Sell</p>
          </div>
        </div>
      </Link>
      <Search />
      <Actions />
    </div>
  );
};

export default Header;
