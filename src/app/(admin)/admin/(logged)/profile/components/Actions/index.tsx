import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreHorizontal, CircleX } from 'lucide-react';

import { DialogItem } from '@/app/(admin)/admin/(logged)/components/DialogItem';
import { DeleteDialog } from '@/app/(admin)/admin/(logged)/components/DeleteDialog';
import { Profile } from '@/@types/profile';

interface ActionsProps {
  profile: Profile;
  onDelete: (profile: Profile) => void;
}

export const Actions = ({ profile, onDelete }: ActionsProps) => {
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
                <CircleX color="red" />
                <p className="pl-2">Delete</p>
              </div>
            }
          >
            <DeleteDialog
              title="Excluir perfil?"
              message="Você tem certeza que deseja excluir este perfil?"
              buttonTitle="Excluir"
              onConfirm={() => onDelete(profile)}
            />
          </DialogItem>
        </DropdownMenuContent>
      </DropdownMenu.Root>
    </div>
  );
};
