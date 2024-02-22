import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface CartStore {
  items: any[];
  addItem: (data: any) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateQty: (data: any) => void;
  total: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: any) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        const index = currentItems.findIndex(
          (cartItem: any) => cartItem.id === data.id
        );

        if (existingItem) {
          if (data.qty >= 0) {
            let newCart = [...currentItems];
            newCart[index] = {
              ...newCart[index],
              qty: newCart[index].qty + 1,
            };
            set({
              items: [...get().items.filter((item) => item.id !== data.id)],
            });
            set({ items: [...newCart] });
            toast.success("Product quantity updated.");
          }
        } else {
          set({ items: [...get().items, data] });
          toast.success("Product added to cart.");
        }
      },
      updateQty(data: any) {
        const currentItems = get().items;
        const index = currentItems.findIndex(
          (cartItem) => cartItem.id === data.id
        );
        const product = currentItems.filter((item) => item.id === data.id);
        if (product.length >= 0) {
          // update product qty
          let newCart = [...currentItems];
          if (data.qty >= 1) {
            newCart[index] = data;
            set({ items: [...newCart] });
          } else {
            set({
              items: [...get().items.filter((item) => item.id !== data.id)],
            });
            toast.success("Product removed from cart.");
          }
          toast.success("Product Quantity Updated.");
        } else {
          toast.success("Product not present in the cart!");
        }
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Product removed from cart.");
      },
      removeAll: () => set({ items: [] }),
      total() {
        const currentItems = get().items;
        const TotalPrice = currentItems.reduce(
          (total, item) => total + item.Price * item.qty,
          0
        );
        return TotalPrice;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
