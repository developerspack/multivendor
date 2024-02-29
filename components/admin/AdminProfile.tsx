"use client";

import { DataTable } from "@/components/DataTable";
import { FetchDocument, FetchDocuments } from "@/Hooks/Hooks";
import TableLoading from "@/components/TableLoading";
import Moment from "react-moment";
import { OrderColumn } from "../orders/OrderColumns";

const AdminProfile = ({ userId }: { userId: string }) => {
  const { data, loading } = FetchDocuments("orders");
  const { document, isLoading } = FetchDocument("users", userId);
  return (
    <div>
      {!isLoading && (
        <div className="flex justify-center items-center">
          <div className="space-y-3">
            <img
              src={document.photo}
              alt=""
              className="rounded-full h-40 w-40"
            />
            <p className="ml-8">{document.name}</p>
            <p className="ml-7">
              <Moment fromNow>{document.createdAt}</Moment>
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 py-2">
        <div className="lg:px-4 pr-4 mt-4">
          {loading ? (
            <TableLoading />
          ) : (
            <>
              <h3 className="font-bold text-lg">Orders</h3>
              <DataTable
                columns={OrderColumn}
                data={data}
                filterKey={"userName"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
