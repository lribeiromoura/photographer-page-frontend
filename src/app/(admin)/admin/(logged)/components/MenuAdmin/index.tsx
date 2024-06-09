'use client';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function MenuAdmin() {
  const [selected, setSelected] = useState('');

  const menu = [
    { name: 'MEDIA', path: '/admin/media', enum: 'media' },
    { name: 'TAG', path: '/admin/tag', enum: 'tag' },
    // { name: 'MEDIA TYPE', path: '/admin/mediatype', enum: 'mediatype' },
  ];

  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setSelected(e.currentTarget.innerText);
  };

  useEffect(() => {
    setSelected(
      menu.find((item) => item.path === window.location.pathname)?.name || '',
    );
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex gap-4">
          {menu.map((item, index) => {
            return (
              <Link href={item.path} key={index} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle())}
                  active={selected === item.name}
                  onClick={handleSelect}
                >
                  {item.name}
                </NavigationMenuLink>
              </Link>
            );
          })}
          {/* <Link href="/admin/media" legacyBehavior passHref>
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
          <Link href="/admin/mediatype" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle())}
              active={selected === "MEDIA TYPE"}
              onClick={handleSelect}
            >
              MEDIA TYPE
            </NavigationMenuLink>
          </Link> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
