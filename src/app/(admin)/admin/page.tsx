'use client';
import React from 'react';

import { Login } from './(logged)/components/Login';

import { useLogin } from '@/hooks/useLogin';

export default function Admin() {
  const {
    handleLogin,
    password,
    setPassword,
    setUsername,
    username,
    isLoginLoading,
  } = useLogin();

  return (
    <Login
      username={username}
      password={password}
      isLoading={isLoginLoading}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
}
