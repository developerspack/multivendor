import Image from "next/image";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import useCart from "@/store/use-cart";

const CartCard = ({ item }: any) => {
  const total = item.qty * item.Price;
  const subtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Ksh",
  }).format(total);
  const router = useRouter();

  const cart = useCart();

  const DecQty = () => {
    const product = {
      ...item,
      qty: item.qty - 1,
    };
    cart.updateQty(product);
  };

  const IncQty = () => {
    const product = {
      ...item,
      qty: item.qty + 1,
    };
    cart.updateQty(product);
  };

  const onRemove = () => {
    cart.removeItem(item.id);
  };

  return (
    <>
      <div className="rounded-lg md:w-4/5 justify-between mb-3 bg-[#dddddd] dark:bg-[#191919] p-4 shadow-md sm:flex block">
        <div className="flex gap-2">
          <Image
            src={item.imageUrl}
            alt={item.Name}
            className="rounded-lg w-24 h-24"
            width={300}
            height={300}
            onClick={() => router.push(`/${item.id}`)}
          />
          <span className="mt-2">
            <h2 className="text-lg font-bold clipper-2">{item.Name}</h2>
          </span>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100 text-black">
            <span
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-primary"
              onClick={DecQty}
            >
              <AiOutlineMinus className="h-5 w-5" />
            </span>
            <span className="h-8 w-8 border bg-white text-center text-lg font-semibold outline-none">
              {item.qty}
            </span>
            <span
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-primary"
              onClick={IncQty}
            >
              <AiOutlinePlus className="h-5 w-5" />
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-base font-semibold">{subtotal}</p>{" "}
            <AiFillDelete
              onClick={onRemove}
              className="h-7 w-7 cursor-pointer duration-150 hover:text-red-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
