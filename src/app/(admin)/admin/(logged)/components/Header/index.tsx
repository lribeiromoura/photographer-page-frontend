import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type HeaderProps = {
  title: string;
  haveButton: boolean;
  buttonTitle: string;
  isButtonModal?: boolean;
  openModal?: boolean;
  modalContent?: React.ReactNode;
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
      <h2 className="text-2xl font-semibold leading-tight text-wh text-white">
        {title}
      </h2>
      {haveButton && !isButtonModal && (
        <div className="flex">
          <button
            className=" bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => buttonCallback()}
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
            className=" bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            {buttonTitle}
          </DialogTrigger>
          <DialogContent>{modalContent}</DialogContent>
        </Dialog>
      )}
    </div>
  );
};
