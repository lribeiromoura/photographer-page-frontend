'use client';

type UserProps = {
  email: string;
  password: string;
};

interface LoginProps {
  user: UserProps;
  isLoading: boolean;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => void;
}

export const Login = ({
  user,
  isLoading,
  setUsername,
  setPassword,
  handleLogin,
}: LoginProps) => {
  return (
    <div className="from-black-300 to-black-600 flex h-screen w-full items-center justify-center bg-gradient-to-tr">
      <div className="bg-black-600 mx-5 flex w-full flex-col items-center rounded shadow-md sm:m-0 sm:w-1/2 md:w-9/12 md:flex-row lg:w-1/2">
        <div className="hidden w-full flex-col items-center justify-center text-white md:flex md:w-1/2">
          <h1 className="text-3xl">Hello</h1>
          <p className="text-5xl font-extrabold">Welcome!</p>
        </div>
        <div className="flex w-full flex-col items-center bg-white px-8 py-32 md:w-1/2">
          <h3 className="text-black-600 mb-4 text-3xl font-bold">LOGIN</h3>
          {/* <form type="submit" className="w-full flex flex-col justify-center"> */}
          <div className="flex w-full flex-col justify-center">
            <div className="mb-4">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={user.email}
                type="email"
                placeholder="Email"
                className="focus:border-black-600 w-full rounded border p-3 text-black placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={user.password}
                type="password"
                placeholder="Password"
                className="focus:border-black-600 w-full rounded border p-3 text-black placeholder-gray-400 focus:outline-none"
              />
            </div>
            <button
              className={`${
                isLoading ? 'bg-slate-500' : 'bg-black'
              } rounded p-3 font-bold text-white focus:outline-none`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
