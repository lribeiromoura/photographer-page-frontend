'use client';
import React from 'react';

import { Login } from './(logged)/components/Login';

import { useLogin } from '@/hooks/useLogin';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await signIn('credentials', {
        redirect: false,
        email: user.email,
        password: user.password,
      });
      if (response?.error) {
        toast.error('Credenciais inválidas');
        return;
      }
      router.push('admin/media');
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Login
      user={user}
      setUsername={(value) => setUser({ ...user, email: value })}
      setPassword={(value) => setUser({ ...user, password: value })}
      isLoading={loading}
      handleLogin={onLogin}
    />
  );
}
