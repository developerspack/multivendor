import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";

const OrderedProducts = ({ data }: { data: any }) => {
  const router = useRouter();
  //   console.log(data);
  return (
    <Dialog>
      <DialogTrigger>
        <Button>View Products</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ordered Products</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] w-full border border-none">
          {data.cartItems.map((item: any) => (
            <>
              <div className="rounded-lg justify-between mb-3 bg-[#dddddd] dark:bg-[#191919] p-4 shadow-md sm:flex block">
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
                    <h2 className="text-lg font-bold clipper-1">{item.Name}</h2>
                  </span>
                  <span className="mt-2">
                    <h2 className="text-lg font-bold clipper-1">
                      Ksh.{item.Price}
                    </h2>
                  </span>
                </div>
              </div>
            </>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderedProducts;
