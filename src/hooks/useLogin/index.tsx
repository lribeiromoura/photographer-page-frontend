"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { login } from "@/app/services/admin";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    debugger;
    const response = await login(username, password);
    if (response.status === 401) {
      console.log("Invalid credentials");
      return;
    }
    localStorage.setItem("access_token", response.access_token);
    redirect("/admin/media");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    redirect("/admin");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      redirect("/admin/media");
    }
  }, []);

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogout,
    handleLogin,
  };
};
