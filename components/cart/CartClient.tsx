"use client";

import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";

import CartCard from "./CartCard";
import { Button } from "../ui/button";
import useCart from "@/store/use-cart";
import { useUserStore } from "@/store/user";
import { uploadDocument } from "@/Hooks/Hooks";

const CartClient = () => {
  const cart = useCart();
  const { user } = useUserStore();

  const Price = cart.total();
  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Ksh",
  }).format(Number(Price));
  // console.log(cart.items);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const handleCheckout = async () => {
    try {
    } catch (error) {}
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:3000/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.items,
        email: user.email,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      const cartItems = cart.items;
      const userId = user.id;
      const order = {
        cartItems,
        userId,
      };
      await uploadDocument("orders", order);
      stripe?.redirectToCheckout({ sessionId: data.id });
      cart.removeAll;
    } else {
      throw new Error(data.error);
    }
  };

  return (
    <div className="container">
      <div className="mt-10 mb-20 lg:mb-10">
        {cart.items?.length ? (
          <>
            {/* Cart header */}
            <div
              className="bg-[#dddddd] dark:bg-[#191919] p-4 mb-4 rounded-lg flex justify-between 
        items-center sticky lg:top-[90px] top-14 z-30"
            >
              <h3 className="text-xl font-extrabold flex gap-3">
                <BsFillCartCheckFill className="h-8 w-8 lg:block hidden" />
                Cart Items
              </h3>
              <div className="gap-3 flex text-lg font-semibold items-center">
                {/* no of items */}
                <span className="text-xl font-extrabold">
                  {cart.items.length} Items
                </span>
                {/* empty cart btn */}
                <Button
                  className="rounded-md flex gap-2"
                  onClick={cart.removeAll}
                >
                  <BsFillCartXFill className="h-6 w-6" />
                  <span className="lg:block hidden">Empty Cart</span>
                </Button>
              </div>
            </div>
            {/* payment card + items */}
            <div className="px-2 block lg:flex">
              {/* items */}
              <div className="w-full">
                {cart.items.map((item) => (
                  <CartCard key={item?.id} item={item} />
                ))}
              </div>
              {/* payment card */}
              <div
                className="mt-6 h-full rounded-lg border border-gray-400 bg-dark 
            p-6 shadow-md md:mt-0 md:w-1/3"
              >
                {/* sub total */}
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-400">Subtotal</p>
                  <p className="text-gray-400">{totalPrice}</p>
                </div>
                <hr className="my-4" />
                {/* total */}
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">{totalPrice}</p>
                  </div>
                </div>
                {/* checkout btn */}
                {user.isLoggedIn && (
                  <Button className="mt-6 w-full" onClick={handleCheckout}>
                    Checkout
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div
            className="bg-green-300 text-black text-center p-3 block 
        rounded-lg cursor-pointer w-full mt-32 text-2xl font-extrabold"
          >
            Cart Is Empty
          </div>
        )}
      </div>
    </div>
  );
};

export default CartClient;
