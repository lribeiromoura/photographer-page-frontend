type ConfirmModalProps = {
  title: string;
  message: string;
  buttonConfirmText?: string;
  buttonCancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
};

export const ConfirmModal = ({
  title,
  message,
  buttonConfirmText = 'Confirm',
  buttonCancelText = 'Cancel',
  onConfirm,
  onCancel,
  isOpen,
}: ConfirmModalProps) => {
  return (
    isOpen && (
      <>
        <main className="bg-transparent-900 absolute left-0 top-0 h-full w-full self-center overflow-x-hidden font-sans text-gray-900 antialiased">
          <div className="relative min-h-screen md:flex md:items-center md:justify-center">
            <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-25"></div>
            <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-4 md:relative md:mx-auto md:max-w-md">
              <div className="items-center md:flex">
                <div className="text-center md:text-left">
                  <p className="font-bold">{title}</p>
                  <p className="mt-1 text-sm text-gray-700">{message}</p>
                </div>
              </div>
              <div className="mt-4 text-center md:flex md:justify-end md:text-right">
                <button
                  onClick={onConfirm}
                  className="block w-full rounded-lg bg-purple-200 px-4 py-3 text-sm font-semibold text-purple-700 md:order-2 md:ml-2 md:inline-block md:w-auto md:py-2"
                >
                  {buttonConfirmText}
                </button>
                <button
                  onClick={onCancel}
                  className="mt-4 block w-full rounded-lg bg-gray-200 px-4 py-3 text-sm font-semibold md:order-1 md:mt-0 md:inline-block md:w-auto md:py-2"
                >
                  {buttonCancelText}
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  );
};
