import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type HeaderProps = {
  title: string;
  haveButton: boolean;
  buttonTitle: string;
  isButtonModal?: boolean;
  openModal?: boolean;
  modalContent?: React.ReactNode;
  isButtonDisabled?: boolean;
  setOpenModal?: (open: boolean) => void;
  buttonCallback: () => void;
};

export const Header = ({
  title,
  haveButton,
  buttonTitle,
  isButtonModal,
  openModal,
  modalContent,
  isButtonDisabled,
  setOpenModal,
  buttonCallback,
}: HeaderProps) => {
  const handleOpenModal = () => {
    if (setOpenModal) {
      setOpenModal(true);
    }
  };
  return (
    <div className="flex justify-between">
      <h2 className="text-wh text-2xl font-semibold leading-tight text-white">
        {title}
      </h2>
      {haveButton && !isButtonModal && (
        <div className="flex">
          <button
            className="rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700 disabled:opacity-50"
            onClick={() => buttonCallback()}
            disabled={isButtonDisabled}
          >
            {buttonTitle}
          </button>
        </div>
      )}
      {haveButton && isButtonModal && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger
            onClick={handleOpenModal}
            data-state={!openModal}
            className="rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700"
          >
            {buttonTitle}
          </DialogTrigger>
          <DialogContent>{modalContent}</DialogContent>
        </Dialog>
      )}
    </div>
  );
};
