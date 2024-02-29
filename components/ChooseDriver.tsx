"use client";

import { FetchDocuments } from "@/Hooks/Hooks";
import Modal from "./Modal";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TableLoading from "./TableLoading";
import { DataTable } from "./DataTable";
import { ChooseDriverColumns } from "./ChooseDriverColumns";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useDriverStore } from "@/store/DriverStore";
import { toast } from "sonner";
import DeliveryDetails from "./DeliveryDetails";

interface ChooseDriverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ChooseDriver = ({ setOpen, open }: ChooseDriverProps) => {
  const [modal, setModal] = useState(false);
  const { data, loading } = FetchDocuments("driver");

  const { setDriver, driver } = useDriverStore();

  const HandleDriverDeselect = () => {
    setDriver({ email: "", id: "", name: "" });
    toast.success("Driver Deselected");
  };

  const HandleClose = () => {
    setModal(true);
    setOpen(false);
  };
  return (
    <>
      <DeliveryDetails open={modal} setOpen={setModal} />
      <Modal open={open} setOpen={setOpen}>
        <DialogHeader>
          <DialogContent className="max-w-2xl">
            <DialogTitle>Choose Driver</DialogTitle>
            <DialogDescription className="flex justify-between">
              Choose Driver who will deliver your order.
              <Button onClick={HandleDriverDeselect}>Deselect Driver</Button>
            </DialogDescription>
            {loading ? (
              <TableLoading />
            ) : (
              <ScrollArea className="h-[80vh] w-full border border-none">
                <p>
                  Selected Driver:{" "}
                  {driver.name === "" ? "None Selected" : driver.name}
                </p>
                <DataTable
                  columns={ChooseDriverColumns}
                  data={data}
                  filterKey={"name"}
                />
              </ScrollArea>
            )}
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button disabled={driver.email === ""} onClick={HandleClose}>
                Contiue
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogHeader>
      </Modal>
    </>
  );
};

export default ChooseDriver;
