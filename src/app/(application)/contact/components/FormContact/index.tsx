'use client';

interface FormContactProps {
  loading: boolean;
  handleSendEmail: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormContact = ({ loading, handleSendEmail }: FormContactProps) => {
  return (
    <form
      onSubmit={handleSendEmail}
      className="mx-auto my-4 flex w-1/2 flex-col items-center justify-center gap-4 rounded-md border-2 border-gray-300 p-4 shadow-md"
    >
      <label htmlFor="name" className="w-full text-xl font-bold">
        Name *
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="w-full rounded-md border-2 border-gray-300 p-2"
      />
      <label htmlFor="email" className="w-full text-xl font-bold">
        Email *
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="w-full rounded-md border-2 border-gray-300 p-2"
      />
      <label htmlFor="message" className="w-full text-xl font-bold">
        Message *
      </label>
      <textarea
        name="message"
        id="message"
        cols={30}
        rows={10}
        className="w-full rounded-md border-2 border-gray-300 p-2"
      ></textarea>
      <button
        disabled={loading}
        className={`${
          loading ? 'cursor-not-allowed bg-slate-600' : 'cursor-pointer'
        } w-full rounded-md bg-black p-2 font-bold text-white transition-all duration-300 ease-in-out hover:bg-gray-800`}
      >
        Send
      </button>
    </form>
  );
};
