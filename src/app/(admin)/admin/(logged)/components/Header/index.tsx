type HeaderProps = {
  title: string;
  haveButton: boolean;
  buttonTitle: string;
  buttonCallback: () => void;
};

export const Header = ({
  title,
  haveButton,
  buttonTitle,
  buttonCallback,
}: HeaderProps) => {
  return (
    <div className="flex justify-between">
      <h2 className="text-2xl font-semibold leading-tight text-wh text-white">
        {title}
      </h2>
      {haveButton && (
        <div className="flex">
          <button
            className=" bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => buttonCallback()}
          >
            {buttonTitle}
          </button>
        </div>
      )}
    </div>
  );
};
