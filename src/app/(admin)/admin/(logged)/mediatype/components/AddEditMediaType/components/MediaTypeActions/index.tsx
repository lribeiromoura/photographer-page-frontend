import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreHorizontal, CircleX, SquarePen } from 'lucide-react';

import { DialogItem } from '@/app/(admin)/admin/(logged)/components/DialogItem';
import { AddEditMediaType } from '../..';
import { DeleteDialog } from '@/app/(admin)/admin/(logged)/components/DeleteDialog';
import { MediaType } from '@/@types/mediatype';
import { Media } from '@/@types/media';

interface mediaTypeActionsProps {
  media: Media;
  onEdit: () => void;
  onDelete: (mediaType: Media) => void;
}

export const MediaTypeActions = ({
  media,
  onEdit,
  onDelete,
}: mediaTypeActionsProps) => {
  return (
    <div className="pr-4 text-right">
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
              <div className="my-2 flex items-center">
                <SquarePen />
                <p className="pl-2">Edit</p>
              </div>
            }
            onOpenChange={() => onEdit()}
          >
            Edit
          </DialogItem>
          <DialogItem
            triggerChildren={
              <div className="my-2 flex items-center">
                <CircleX color="red" />
                <p className="pl-2">Delete</p>
              </div>
            }
          >
            <DeleteDialog
              title="Delete mediaType"
              message="Are you sure you want to delete this media type?"
              buttonTitle="Delete"
              onConfirm={() => onDelete(media)}
            />
          </DialogItem>
        </DropdownMenuContent>
      </DropdownMenu.Root>
    </div>
  );
};
