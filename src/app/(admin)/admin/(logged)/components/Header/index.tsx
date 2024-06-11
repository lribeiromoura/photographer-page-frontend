import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type HeaderProps = {
  title: string;
  haveButton: boolean;
  buttonTitle: string;
  isButtonModal?: boolean;
  openModal?: boolean;
  modalContent?: React.ReactNode;
  isButtonDisabled?: boolean;
  tootipContent?: string | null;
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
  tootipContent,
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
        <div className="group relative flex">
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger
              onClick={handleOpenModal}
              data-state={!openModal}
              disabled={isButtonDisabled}
              className="rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700 disabled:opacity-50"
            >
              {buttonTitle}
            </DialogTrigger>
            {tootipContent && (
              <span className="absolute bottom-12 w-full scale-0 rounded bg-gray-800 p-2 text-center text-xs text-white transition-all group-hover:scale-100">
                {tootipContent}
              </span>
            )}

            <DialogContent>{modalContent}</DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};
