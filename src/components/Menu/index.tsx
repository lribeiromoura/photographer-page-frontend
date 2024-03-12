"use client";
import Link from "next/link";
import { useState } from "react";

export const MenuComponent = () => {
  const [selected, setSelected] = useState("");

  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setSelected(e.currentTarget.innerText);
  };

  return (
    <nav className="flex flex-col items-center gap-6 mb-10 lg:w-1/4 md:w-full">
      <Link
        href="/"
        onClick={handleSelect}
        className="font-bold text-4xl text-center"
      >
        LUCAS SHTORACHE
      </Link>
      <ul>
        <li>
          <Link
            href="/photos"
            onClick={handleSelect}
            className={
              selected === "Photos" ? "font-bold text-black" : "text-black"
            }
          >
            Photos
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={
              selected === "Contact" ? "font-bold text-black" : "text-black"
            }
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
