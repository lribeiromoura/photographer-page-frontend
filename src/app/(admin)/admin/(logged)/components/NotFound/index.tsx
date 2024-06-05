type NotFoundProps = {
  title: string;
  description: string;
};

export const NotFound = ({ title, description }: NotFoundProps) => {
  return (
    <div className="flex h-96 w-full justify-center self-center bg-white py-4">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-wh text-4xl font-semibold leading-tight text-black">
          {title}
        </h2>
        <p className="text-lg text-gray-500">{description}</p>
      </div>
    </div>
  );
};
