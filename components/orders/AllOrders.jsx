import { CirclesWithBar } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useState } from "react";

import Product from "./Product";
import HeaderDetails from "./HeaderDetails";
import FetchCollection from "../../Hooks/FetchCollection";
import { selectUserID } from "../../redux/slice/authSlice";

const AllOrders = () => {
  const [drop, setDrop] = useState(null);
  const userId = useSelector(selectUserID);
  const { data, isLoading } = FetchCollection("orders");
  const Orders = data.filter((order) => order.userID === userId);

  return (
    <>
      {isLoading ? (
        <div className="items-center gap-2 justify-center flex">
          <CirclesWithBar
            height="70"
            width="70"
            color="#4acd8d"
            visible={true}
            ariaLabel="circles-with-bar-loading"
          />
          Loading ...
        </div>
      ) : (
        <>
          {Orders.length ? (
            <div className="mt-4 mb-20 lg:mb-10">
              {/* order */}
              {Orders?.map((orders) => (
                <div
                  className="block border-solid border-4 border-slate-500 rounded-lg mb-2"
                  key={orders.id}
                >
                  {/* header */}
                  <HeaderDetails
                    {...orders}
                    dropStatus={drop}
                    setDropDown={setDrop}
                    orderId={orders.id}
                  />
                  {/* products */}
                  {drop === orders.id && (
                    // mobile orderdate and orderAmount
                    <div key={orders.id}>
                      <div className="flex justify-between p-4 md:hidden border-b border-slate-400 pb-2">
                        {/* orderDate */}
                        <span className="text-gray-300 space-y-1">
                          <p>Date</p>
                          <p className="text-gray-500">{orders.orderDate}</p>
                        </span>
                        {/* orderAmount */}
                        <span className="text-gray-300 space-y-1">
                          <p>Total Amount</p>
                          <p className="text-gray-500">
                            Ksh.{orders.orderAmount}
                          </p>
                        </span>
                      </div>
                      {/* products */}
                      {orders.items?.map((product) => (
                        <Product {...product} key={product.id} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 mb-20 lg:mb-10 justify-center text-center text-2xl font-bold">
              No Orders Found
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllOrders;
