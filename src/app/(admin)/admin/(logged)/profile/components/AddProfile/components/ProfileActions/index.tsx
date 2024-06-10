import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreHorizontal, CircleX, SquarePen } from 'lucide-react';

import { DialogItem } from '@/app/(admin)/admin/(logged)/components/DialogItem';
import { DeleteDialog } from '@/app/(admin)/admin/(logged)/components/DeleteDialog';
import { Profile } from '@/@types/profile';
import { MediaType } from '@/@types/mediatype';

interface ProfileActionsProps {
  profile: Profile;
  mediaTypes: MediaType[];
  onEdit: (profile: Profile) => void;
  onDelete: (profile: Profile) => void;
}

export const ProfileActions = ({
  profile,
  mediaTypes,
  onEdit,
  onDelete,
}: ProfileActionsProps) => {
  const handleEditProfile = (profile: Profile) => {
    onEdit(profile);
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
          {/* <DialogItem
            triggerChildren={
              <div className="my-2 flex items-center">
                <SquarePen />
                <p className="pl-2">Edit</p>
              </div>
            }
          >
            <AddEditProfile
              onConfirm={(profileEdited) => handleEditProfile(profileEdited)}
              profile={profile}
              mediaTypes={mediaTypes}
            />
          </DialogItem> */}
          <DialogItem
            triggerChildren={
              <div className="my-2 flex items-center">
                <CircleX color="red" />
                <p className="pl-2">Delete</p>
              </div>
            }
          >
            <DeleteDialog
              title="Delete Profile"
              message="Are you sure you want to delete this profile?"
              buttonTitle="Delete"
              onConfirm={() => onDelete(profile)}
            />
          </DialogItem>
        </DropdownMenuContent>
      </DropdownMenu.Root>
    </div>
  );
};
