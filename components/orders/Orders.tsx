"use client";

import { FetchDocuments } from "@/Hooks/Hooks";
import { useUserStore } from "@/store/user";
import TableLoading from "../TableLoading";
import { DataTable } from "../DataTable";
import { OrderColumn } from "./OrderColumns";

const Orders = () => {
  const { user } = useUserStore();
  const { data, loading } = FetchDocuments("orders");
  const orders = data.filter((order: any) => order.userId === user.id);

  return (
    <div className="mt-4 py-2">
      <div className="lg:px-4 pr-4 mt-4">
        {loading ? (
          <TableLoading />
        ) : (
          <>
            <h3 className="font-bold text-lg">Orders</h3>
            <DataTable
              columns={OrderColumn}
              data={orders}
              filterKey={"driverName"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
