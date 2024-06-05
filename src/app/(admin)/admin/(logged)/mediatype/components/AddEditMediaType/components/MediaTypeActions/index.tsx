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

interface mediaTypeActionsProps {
  mediaType: MediaType;
  onEdit: (mediaType: MediaType) => void;
  onDelete: (mediaType: MediaType) => void;
}

export const MediaTypeActions = ({
  mediaType,
  onEdit,
  onDelete,
}: mediaTypeActionsProps) => {
  const handleEditmediaType = (mediaType: MediaType) => {
    onEdit(mediaType);
  };
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
          >
            <AddEditMediaType
              onConfirm={(mediaTypeEdited) =>
                handleEditmediaType(mediaTypeEdited)
              }
              mediaType={mediaType}
            />
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
              onConfirm={() => onDelete(mediaType)}
            />
          </DialogItem>
        </DropdownMenuContent>
      </DropdownMenu.Root>
    </div>
  );
};
