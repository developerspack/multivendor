import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FetchDocuments } from "@/Hooks/Hooks";
import Moment from "react-moment";

const ViewDriver = ({ data: driverData }: { data: any }) => {
  const { data, loading } = FetchDocuments("driver");

  const userData = data.filter(
    (driver: any) => driver.email === driverData.driverEmail
  );
  const document = userData[0];

  return (
    <Dialog>
      <DialogTrigger>
        <Button>View Driver</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Driver Details</DialogTitle>
        </DialogHeader>
        {!loading && (
          <div className="space-y-3 flex flex-col justify-center items-center">
            <img src={document.photo} alt="" className="rounded-lg size-60" />
            <p className="">{document.name}</p>
            <p>{document.email}</p>
            <p>Avarange Delivery Time: {document.AvarangeDeliveryTime}</p>
            <p className="">
              CreatedAt:
              <Moment fromNow className="ml-2">
                {document.createdAt}
              </Moment>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDriver;
