import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const OrderDliveryAction = ({ data }: { data: any }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Delivery Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delivery Details</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <div className="space-y-3">
            <p>Phone Number:{data.DeliveryDetails.phoneNumber}</p>
            <p>Address:{data.DeliveryDetails.deliveryAddress}</p>
            <p></p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDliveryAction;
