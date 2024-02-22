import { FaShoppingBag } from "react-icons/fa";

const MyOrders = () => {
  return (
    <div>
      <div className="container">
        <div className="mt-8">
          <div className="flex gap-3 place-items-baseline">
            <FaShoppingBag className="text-red-500 h-8 w-8" />
            <h3 className="text-2xl md:text-3xl text-primary">
              Your Order History
            </h3>
          </div>
          Your Order History
          {/* <AllOrders /> */}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
