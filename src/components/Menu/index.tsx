"use client";
import { useMediaTypes } from "@/hooks/useMediaTypes";
import { useMediaTags } from "@/hooks/useTags";
import Link from "next/link";
import { useEffect, useState } from "react";

export const MenuComponent = () => {
  const [selected, setSelected] = useState("");
  const { tags, loadingTags } = useMediaTags();

  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setSelected(e.currentTarget.innerText);
  };

  useEffect(() => {
    setSelected(window.location.pathname.split("/")[2] || "");
  }, []);

  return (
    <nav className="flex flex-col items-center gap-6 mb-10 lg:w-1/4 md:w-full">
      <Link
        href="/"
        onClick={handleSelect}
        className="font-bold text-4xl text-center"
      >
        LUCAS SHTORACHE
      </Link>
      {!loadingTags && (
        <ul className="flex flex-col gap-4 text-2xl text-center">
          {tags.map.length > 0 &&
            tags.map((tag) => (
              <li key={tag._id}>
                <Link
                  href={`/photos/${tag.name}`}
                  onClick={handleSelect}
                  className={
                    selected === tag.name
                      ? "font-bold text-black"
                      : "text-black"
                  }
                >
                  {tag.name}
                </Link>
              </li>
            ))}
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
              onClick={handleSelect}
              className={
                selected === "Contact" ? "font-bold text-black" : "text-black"
              }
            >
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
