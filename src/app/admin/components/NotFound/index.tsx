type NotFoundProps = {
  title: string;
  description: string;
};

export const NotFound = ({ title, description }: NotFoundProps) => {
  return (
    <div className="py-4 flex w-full justify-center self-center bg-white h-96">
      <div className="text-center justify-center items-center flex flex-col">
        <h2 className="text-4xl font-semibold leading-tight text-wh text-black ">
          {title}
        </h2>
        <p className="text-lg text-gray-500">{description}</p>
      </div>
    </div>
  );
};
