"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function MenuAdmin() {
  const [selected, setSelected] = useState("");

  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setSelected(e.currentTarget.innerText);
  };

  useEffect(() => {
    setSelected(window.location.pathname.split("/")[2].toUpperCase() || "");
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex gap-4 ">
          <Link href="/admin/media" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle())}
              active={selected === "MEDIA"}
              onClick={handleSelect}
            >
              MEDIA
            </NavigationMenuLink>
          </Link>
          <Link href="/admin/tag" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle())}
              active={selected === "TAG"}
              onClick={handleSelect}
            >
              TAG
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
