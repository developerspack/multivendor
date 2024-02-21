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
import { Separator } from "@/components/ui/separator";
// import { UpdateDcoument, uploadDocument } from "@/Hooks/Hooks";
import { Textarea } from "@/components/ui/textarea";
import UploadMultipleImages from "@/components/UploadMultipleImages";
import Heading from "@/components/heading";
import UploadSingleItem from "@/components/UploadSingleItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateDcoument, uploadDocument } from "@/Hooks/Hooks";
import { useUserStore } from "@/store/user";
// import { useUserStore } from "@/store/user";

// form velidation
const formSchema = z.object({
  Name: z.string().min(1),
  Brand: z.string().min(1),
  imageUrl: z.string().min(1),
  otherImageUrl: z.string().array().optional().default([]),
  Category: z.string().min(1),
  Description: z.string().min(1),
  Discount: z.coerce.number().min(1),
  Price: z.coerce.number().min(1),
});

interface AddEditFormProps {
  initialData: any;
  id: string;
}

const AddEditForm = ({ initialData, id }: AddEditFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otherImages, setOtherImages] = useState<string[] | null>([]);
  const [thumbnail, setTumbnail] = useState<string | null>("");

  const { user } = useUserStore();

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      for (const fieldName in initialData) {
        if (form.setValue && initialData[fieldName] !== null) {
          form.setValue(fieldName, initialData[fieldName]);
        }
      }
      setOtherImages(initialData.otherImageUrl);
      setTumbnail(initialData.imageUrl);
    }
  }, [initialData]);
  // dynamic text
  const title =
    Object.keys(initialData).length > 0 ? "Edit Product" : "Create Product";
  const description =
    Object.keys(initialData).length > 0
      ? "Edit a Product."
      : "Add a new Product";
  const action =
    Object.keys(initialData).length > 0 ? "Save changes" : "Create";

  // upload values
  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        Name: "",
        Brand: "",
        imageUrl: "",
        otherImageUrl: [],
        Price: 0,
        Discount: 0,
        Category: "",
        Description: "",
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
        await UpdateDcoument("products", id, uploadValues);
      } else {
        await uploadDocument("products", uploadValues);
      }
      setIsLoading(false);
      router.push(`/user/${user.id}/viewItems`);
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Thumbnail</FormLabel>
                <FormControl>
                  <UploadSingleItem
                    disabled={isLoading}
                    onChange={(imageUrl) => field.onChange(imageUrl)}
                    selectedFile={thumbnail}
                    setSelectedFile={setTumbnail}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otherImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Other Images(Optional)</FormLabel>
                <FormControl>
                  <UploadMultipleImages
                    disabled={isLoading}
                    onChange={(imageUrl) => field.onChange(imageUrl)}
                    selectedFile={otherImages}
                    setSelectedFile={setOtherImages}
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
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* description */}
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* /price */}
            <FormField
              control={form.control}
              name="Price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* discount */}
            <FormField
              control={form.control}
              name="Discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Discount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* categories */}
            <FormField
              control={form.control}
              name="Category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"category.Category"}></SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* brands */}
            <FormField
              control={form.control}
              name="Brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Brand"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"brand.Brand"}></SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
