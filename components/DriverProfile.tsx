"use client";

import { DataTable } from "@/components/DataTable";
import { FetchDocuments } from "@/Hooks/Hooks";
import TableLoading from "@/components/TableLoading";
import Moment from "react-moment";
import { useUserStore } from "@/store/user";
import { OrderColumn } from "./orders/OrderColumns";

const DriverProfile = () => {
  const { user } = useUserStore();
  const { data, loading } = FetchDocuments("orders");
  const orders = data.filter((order: any) => order.driverEmail === user.email);

  const { data: userInfo, loading: isLoading } = FetchDocuments("driver");
  const userData = userInfo.filter(
    (driver: any) => driver.email === user.email!
  );
  const userDetails = userData[0];

  return (
    <>
      {!isLoading && (
        <div className="flex justify-center items-center">
          <div className="space-y-3">
            <img
              src={userDetails.photo}
              alt=""
              className="rounded-full h-40 w-40"
            />
            <p className="ml-8">{userDetails.name}</p>
            <p>{userDetails.email}</p>
            <p className="ml-10">
              <Moment fromNow>{userDetails.createdAt}</Moment>
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
              <h3 className="font-bold text-lg">Deliveries</h3>
              <DataTable
                columns={OrderColumn}
                data={orders}
                filterKey={"driverName"}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DriverProfile;
