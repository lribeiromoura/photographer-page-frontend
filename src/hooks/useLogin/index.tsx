'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/admin';

export const useLogin = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string>('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoginLoading(true);
    const response = await login(username, password);
    if (response.status === 401) {
      throw new Error('Invalid credentials');
      return;
    }
    localStorage.setItem('access_token', response);
    setIsLoginLoading(false);
    router.push('/admin/media');
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/admin');
  };

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem('access_token');
    if (tokenLocalStorage && window.location.pathname === '/admin') {
      setToken(tokenLocalStorage);
      router.push('/admin/media');
    }
  }, [token]);

  return {
    username,
    password,
    token,
    isLoginLoading,
    setUsername,
    setPassword,
    handleLogout,
    handleLogin,
  };
};
