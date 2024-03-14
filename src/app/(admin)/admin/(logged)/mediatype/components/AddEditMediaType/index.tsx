import { Button } from "@/components/ui/button";
import { DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MediaType } from "@/@types/mediatype";

interface AddEditMediaTypeProps {
  onConfirm: (mediaType: MediaType) => void;
  mediaType?: MediaType;
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export const AddEditMediaType = ({
  onConfirm,
  mediaType,
}: AddEditMediaTypeProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mediaType?.name || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onConfirm({
      _id: mediaType?._id,
      ...values,
    });
  }

  return (
    <>
      <DialogTitle>Edit</DialogTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter className="pt-5">
        <Button
          type="submit"
          className="w-full"
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </DialogFooter>
    </>
  );
};
