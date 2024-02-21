"use client";

import { DataTable } from "@/components/DataTable";
import { FetchCollection } from "@/Hooks/Hooks";
import { columns } from "@/components/columns";
import TableLoading from "@/components/TableLoading";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { data, loading } = FetchCollection("items", "Open", "bidding");

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="space-y-3">
          <img src="/favicon.ico" alt="" className="rounded-full h-40 w-40" />
          <p className="ml-8">Benson Raro</p>
        </div>
      </div>

      <div className="mt-4 py-2">
        <div className="lg:px-4 pr-4 mt-4">
          {loading ? (
            <TableLoading />
          ) : (
            <>
              <h3 className="font-bold text-lg">Products Orders</h3>
              <DataTable columns={columns} data={data} filterKey={"Name"} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
