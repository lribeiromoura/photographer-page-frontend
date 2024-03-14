import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, CircleX, SquarePen } from "lucide-react";

import { DialogItem } from "@/app/(admin)/admin/(logged)/components/DialogItem";
import { AddEditTag } from "../..";
import { DeleteDialog } from "@/app/(admin)/admin/(logged)/components/DeleteDialog";
import { Tag } from "@/@types/tag";
import { MediaType } from "@/@types/mediatype";

interface TagActionsProps {
  tag: Tag;
  mediaTypes: MediaType[];
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
}

export const TagActions = ({
  tag,
  mediaTypes,
  onEdit,
  onDelete,
}: TagActionsProps) => {
  const handleEditTag = (tag: Tag) => {
    onEdit(tag);
  };
  return (
    <div className="text-right pr-4">
      <DropdownMenu.Root>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="h-8 w-8 p-0 align-middle">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogItem
            triggerChildren={
              <div className="flex items-center my-2">
                <SquarePen />
                <p className="pl-2 ">Edit</p>
              </div>
            }
          >
            <AddEditTag
              onConfirm={(tagEdited) => handleEditTag(tagEdited)}
              tag={tag}
              mediaTypes={mediaTypes}
            />
          </DialogItem>
          <DialogItem
            triggerChildren={
              <div className="flex items-center my-2">
                <CircleX color="red" />
                <p className="pl-2">Delete</p>
              </div>
            }
          >
            <DeleteDialog
              title="Delete Tag"
              message="Are you sure you want to delete this tag?"
              buttonTitle="Delete"
              onConfirm={() => onDelete(tag)}
            />
          </DialogItem>
        </DropdownMenuContent>
      </DropdownMenu.Root>
    </div>
  );
};
