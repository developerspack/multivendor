"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Heading from "@/components/heading";
import UploadSingleItem from "@/components/UploadSingleItem";
import { UpdateDcoument, uploadDocument } from "@/Hooks/Hooks";
import { useUserStore } from "@/store/user";

// form velidation
const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  photo: z.string().min(1),
  price: z.coerce.number().min(1).default(400),
  role: z.string().optional().default("driver"),
});

interface AddEditFormProps {
  initialData: any;
  id: string;
}

const AddEditForm = ({ initialData, id }: AddEditFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>("");

  const { user } = useUserStore();

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      for (const fieldName in initialData) {
        if (form.setValue && initialData[fieldName] !== null) {
          form.setValue(fieldName, initialData[fieldName]);
        }
      }
      setPhoto(initialData.photo);
    }
  }, [initialData]);
  // dynamic text
  const title =
    Object.keys(initialData).length > 0 ? "Edit Driver" : "Add Driver";
  const description =
    Object.keys(initialData).length > 0 ? "Edit a Driver." : "Add a new Driver";
  const action =
    Object.keys(initialData).length > 0 ? "Save changes" : "Create";

  // upload values
  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: "",
        email: "",
        photo: "",
        price: 400,
        role: "driver",
      };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // submit values
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    setIsLoading(true);
    const uploadValues = {
      ...values,
      userId: user.id,
    };

    try {
      if (Object.keys(initialData).length > 0) {
        await UpdateDcoument("driver", id, uploadValues);
      } else {
        await uploadDocument("driver", uploadValues);
      }
      setIsLoading(false);
      router.push(`/admin/${user?.id}/viewDrivers`);
    } catch (error) {
      console.error("Error uploading to Firebase:", error);
      setIsLoading(false);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  // console.log(form.formState.errors);
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between pl-4 pb-8">
        <Heading title={title} description={description} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
          {/* image */}
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver photo</FormLabel>
                <FormControl>
                  <UploadSingleItem
                    disabled={isLoading}
                    onChange={(photo) => field.onChange(photo)}
                    selectedFile={photo}
                    setSelectedFile={setPhoto}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* // Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      defaultValue={400}
                      disabled={isLoading}
                      placeholder="Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* btn */}
            <Button
              disabled={isLoading}
              className="w-full tracking-wider float-right mb-4 sm:mt-8"
              type="submit"
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEditForm;
