"use client";
import React from "react";

import { Login } from "./components/Login";

import { useLoginContext } from "./context/login";

export default function Admin() {
  const { handleLogin, password, setPassword, setUsername, username } =
    useLoginContext();

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
