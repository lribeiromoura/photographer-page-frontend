"use client";
import React from "react";

import { Login } from "./components/Login";

import { useLogin } from "@/hooks/useLogin";

export default function Admin() {
  const { handleLogin, password, setPassword, setUsername, username } =
    useLogin();

  return (
    <Login
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
}
