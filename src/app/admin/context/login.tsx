"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { login } from "@/app/services/admin";

type LoginContextType = {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => void;
};

type LoginContextProviderProps = {
  children: React.ReactNode;
};

const LoginContext = createContext({} as LoginContextType);

export function useLoginContext() {
  const context = useContext(LoginContext);
  return context;
}

export const LoginContextProvider = ({
  children,
}: LoginContextProviderProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await login(username, password);
    localStorage.setItem("access_token", response.access_token);
    redirect("/admin/media");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      redirect("/admin/media");
    }
  }, []);

  const contextValue = {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
