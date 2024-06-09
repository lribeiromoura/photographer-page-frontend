// create component not found of a list that receives a title and a subtitle

interface NotFoundProps {
  title: string;
  subtitle: string;
}

export default function NotFound({ title, subtitle }: NotFoundProps) {
  return (
    <div className="m-4 flex h-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      <p className="text-lg text-gray-600">{subtitle}</p>
    </div>
  );
}
