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
  buttonConfirmText = "Confirm",
  buttonCancelText = "Cancel",
  onConfirm,
  onCancel,
  isOpen,
}: ConfirmModalProps) => {
  return (
    isOpen && (
      <>
        <main className="absolute top-0 left-0 self-center antialiased bg-transparent-900 text-gray-900 font-sans overflow-x-hidden w-full h-full">
          <div className="relative min-h-screen md:flex md:items-center md:justify-center">
            <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
              <div className="md:flex items-center">
                <div className="text-center md:text-left">
                  <p className="font-bold">{title}</p>
                  <p className="text-sm text-gray-700 mt-1">{message}</p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={onConfirm}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-purple-200 text-purple-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  {buttonConfirmText}
                </button>
                <button
                  onClick={onCancel}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
                  md:mt-0 md:order-1"
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
