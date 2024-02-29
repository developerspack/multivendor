"use client";

import { uploadDocument } from "@/Hooks/Hooks";
import Modal from "./Modal";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "@/store/use-cart";
import { useUserStore } from "@/store/user";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDriverStore } from "@/store/DriverStore";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ChooseDriverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  deliveryAddress: z.string().min(1),
  phoneNumber: z.coerce.number().min(10),
});

const DeliveryDetails = ({ setOpen, open }: ChooseDriverProps) => {
  const [isLoading, setILoading] = useState(false);

  const cart = useCart();
  const { user } = useUserStore();
  const { driver } = useDriverStore();

  const Price = cart.total();

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "Ksh",
  }).format(Number(Price));
  // console.log(cart.items);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const host =
    process.env.NODE_ENV === "production"
      ? "https://dpmultivendor.vercel.app"
      : "http://localhost:3000";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: 0o7,
      deliveryAddress: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    setILoading(true);
    const stripe = await stripePromise;
    const response = await fetch(`${host}/api/stripe`, {
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
      const userName = user.Name;
      const order = {
        totalPrice,
        cartItems,
        userId,
        userName,
        driverEmail: driver.email,
        driverId: driver.id,
        driverName: driver.name,
        DeliveryDetails: {
          deliveryAddress: values.deliveryAddress,
          phoneNumber: values.phoneNumber,
        },
        createdAt: Timestamp.now().toDate().toString(),
      };
      await uploadDocument("orders", order);
      stripe?.redirectToCheckout({ sessionId: data.id });
      cart.removeAll();
      setILoading(false);
    } else {
      throw new Error(data.error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setOpen(true);
    }
  }, [isLoading, open]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <DialogHeader>
        <DialogContent className="max-w-2xl">
          <DialogTitle>Choose Driver</DialogTitle>
          <DialogDescription className="flex justify-between">
            Fill In your delivery details.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        id="phoneNumber"
                        type="number"
                        placeholder="0712345678"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Adress</FormLabel>
                    <FormControl>
                      <Textarea id="delivery-address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button disabled={isLoading} onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Contiue
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </DialogHeader>
    </Modal>
  );
};

export default DeliveryDetails;
