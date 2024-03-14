import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photographer Portfolio",
  description: "Generated by create next app",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} bg-black text-white h-full py-10 px-4 mx-auto sm:px-8`}
    >
      {children}
    </div>
  );
}
