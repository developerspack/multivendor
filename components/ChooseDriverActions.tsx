"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useDriverStore } from "@/store/DriverStore";

interface CellActionProps {
  data: any;
}

const ChooseDriverActions = ({ data }: CellActionProps) => {
  const { setDriver, driver } = useDriverStore();

  const HandleSelect = () => {
    setDriver({ id: data.id, email: data.email, name: data.name });
    toast.success(`${data.name} Selected`);
  };

  return (
    <Button disabled={driver.email !== ""} onClick={HandleSelect}>
      Select
    </Button>
  );
};

export default ChooseDriverActions;
