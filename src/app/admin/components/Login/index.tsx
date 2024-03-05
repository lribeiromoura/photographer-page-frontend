"use client";
import { LoginContextProvider } from "../../context/login";

interface LoginProps {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => void;
}

export const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}: LoginProps) => {
  return (
    <LoginContextProvider>
      <div className="bg-gradient-to-tr from-black-300 to-black-600 h-screen w-full flex justify-center items-center">
        <div className="bg-black-600 w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded">
          <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl">Hello</h1>
            <p className="text-5xl font-extrabold">Welcome!</p>
          </div>
          <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8">
            <h3 className="text-3xl font-bold text-black-600 mb-4">LOGIN</h3>
            <form className="w-full flex flex-col justify-center">
              <div className="mb-4">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-black-600 "
                />
              </div>
              <div className="mb-4">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-black-600"
                />
              </div>
              <button
                className="bg-black font-bold text-white focus:outline-none rounded p-3"
                onClick={() => handleLogin()}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </LoginContextProvider>
  );
};
