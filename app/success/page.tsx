import Link from "next/link";
import { VscPassFilled } from "react-icons/vsc";

const SuccessPage = () => {
  return (
    <div className="h-screen text-white justify-center items-center flex">
      <div className="bg-dark rounded-md shadow-2xl p-6  md:mx-auto">
        <VscPassFilled className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-300 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-gray-400"> Have a great day! </p>
          <div className="py-10 text-center">
            <Link
              href="/MyOrders"
              className="px-12 rounded-md bg-primary hover:bg-green-500 text-black font-semibold py-3"
            >
              View Your Odrers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
