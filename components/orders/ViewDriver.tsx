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
  //   console.log(userData);
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
          <div className="flex justify-center items-center">
            <div className="space-y-3">
              <img
                src={document.photo}
                alt=""
                className="rounded-full h-40 w-40"
              />
              <p className="ml-8">{document.name}</p>
              <p>{document.email}</p>
              <p className="ml-10">
                <Moment fromNow>{document.createdAt}</Moment>
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDriver;
