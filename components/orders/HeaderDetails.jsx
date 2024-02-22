import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdOutlinePending,
} from "react-icons/md";
import { VscPassFilled } from "react-icons/vsc";
import { FcCancel } from "react-icons/fc";

let Status;

const HeaderDetails = ({
  id,
  orderDate,
  orderAmount,
  orderStatus,
  setDropDown,
  dropStatus,
  orderId,
}) => {
  const OrderStatus = () => {
    if (orderStatus === "Processing") {
      Status = (
        <p className="text-gray-500 flex gap-2 items-center">
          <MdOutlinePending className="text-yellow-400 h-6 w-6" />
          Processing
        </p>
      );
    } else if (orderStatus === "Canceled") {
      Status = (
        <p className="text-gray-500 flex gap-2 items-center">
          <FcCancel className="w-6 h-6" />
          Canceled
        </p>
      );
    } else if (orderStatus === "Delivered") {
      Status = (
        <p className="text-gray-500 flex gap-2 items-center">
          <VscPassFilled className="text-green-400 h-6 w-6" />
          Delivered
        </p>
      );
    }
    return <div>{Status}</div>;
  };

  const toggleContent = () => {
    if (dropStatus === orderId) {
      setDropDown(null); // Close the dropdown for the same order
    } else {
      setDropDown(orderId); // Open the dropdown for the clicked order
    }
  };

  return (
    <div className="p-2 text-lg justify-between bg-dark flex">
      {/* id */}
      <span className="text-gray-300 space-y-1">
        <p>OrderID</p>
        <p className="text-gray-500">{id.slice(0, 8)}...</p>
      </span>
      {/* date */}
      <span className="text-gray-300 space-y-1 hidden md:block">
        <p>Date</p>
        <p className="text-gray-500">{orderDate}</p>
      </span>
      {/* amount */}
      <span className="text-gray-300 space-y-1 hidden md:block">
        <p>Total Amount</p>
        <p className="text-gray-500">Ksh.{orderAmount}</p>
      </span>
      {/* status */}
      <span className="text-gray-300 space-y-1">
        <p>Order Status</p>
        <OrderStatus />
      </span>

      {/* btn */}
      <button
        className="cursor-pointer hover:bg-primary items-center hover:text-black p-2 flex border-2 border-slate-600 rounded-md"
        onClick={toggleContent}
      >
        {dropStatus === orderId ? (
          <>
            <span className="hidden md:block">Hide Products</span>
            <MdArrowDropUp className="h-8 w-8" />
          </>
        ) : (
          <>
            <span className="hidden md:block">Show Products</span>
            <MdArrowDropDown className="h-8 w-8" />
          </>
        )}
      </button>
    </div>
  );
};

export default HeaderDetails;
