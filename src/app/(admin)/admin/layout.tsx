import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

const inter = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lucas Shtorache',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} mx-auto min-h-screen w-full text-white`}
    >
      {children}
    </div>
  );
}
