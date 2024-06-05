import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteDialogProps {
  title: string;
  message: string;
  buttonTitle: string;
  onConfirm: () => void;
}

export const DeleteDialog = ({
  title,
  message,
  buttonTitle,
  onConfirm,
}: DeleteDialogProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={onConfirm}>{buttonTitle}</Button>
      </DialogFooter>
    </>
  );
};
