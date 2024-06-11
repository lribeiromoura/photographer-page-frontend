import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { MenuComponent } from '@/components/Menu';
import 'react-toastify/dist/ReactToastify.css';
import { use, useEffect } from 'react';

const inter = Rubik({
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lucas Shtorache',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} flex flex-col p-4 sm:flex-row`}>
      <MenuComponent />
      <div className="h-[80vh] w-full self-center overflow-auto sm:h-[90vh]">
        {children}
      </div>
    </div>
  );
}
