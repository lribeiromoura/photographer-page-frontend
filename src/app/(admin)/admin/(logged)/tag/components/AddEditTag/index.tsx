import { Button } from "@/components/ui/button";
import { DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tag } from "@/@types/tag";
import { MediaType } from "@/@types/mediatype";

interface AddEditTagProps {
  onConfirm: (tag: Tag) => void;
  tag?: Tag;
  mediaTypes: MediaType[];
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  type: z.string().min(2).max(50),
});

export const AddEditTag = ({ onConfirm, tag, mediaTypes }: AddEditTagProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tag?.name || "",
      description: tag?.description || "",
      type: tag?.type || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onConfirm({
      _id: tag?._id,
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[-webkit-fill-available]">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mediaTypes.map((mediaType) => (
                        <SelectItem key={mediaType._id} value={mediaType.name}>
                          {mediaType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
