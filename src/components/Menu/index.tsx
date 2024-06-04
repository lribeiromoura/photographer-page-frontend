"use client";
import { useMediaTags } from "@/hooks/useTags";
import Link from "next/link";
import { useEffect, useState } from "react";

import Drawer from "../Drawer";
import { MenuList } from "./components/MenuList";

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
    <nav className="flex mb-10 items-center justify-between md:w-1/4 sm:mr-10 sm:flex-col sm:gap-6 sm:items-start sm:justify-start">
      <Link
        href="/"
        onClick={handleSelect}
        className="font-bold text-xl sm:text-3xl"
      >
        LUCAS SHTORACHE
      </Link>
      {!loadingTags && (
        <>
          <div className="hidden sm:block">
            <MenuList
              handleSelect={handleSelect}
              selected={selected}
              tags={tags}
            />
          </div>
          <div className="block sm:hidden">
            <Drawer>
              <MenuList
                handleSelect={handleSelect}
                selected={selected}
                tags={tags}
              />
            </Drawer>
          </div>
        </>
      )}
    </nav>
  );
};
