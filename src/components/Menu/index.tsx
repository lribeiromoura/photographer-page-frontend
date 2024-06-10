'use client';
import { useMediaTags } from '@/hooks/useTags';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Drawer from '../Drawer';
import { MenuList } from './components/MenuList';

export const MenuComponent = () => {
  const [selected, setSelected] = useState('');
  const { tags, loadingTags } = useMediaTags();

  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setSelected(e.currentTarget.innerText);
  };

  useEffect(() => {
    const path = decodeURIComponent(window.location.pathname.split('/')[1]);
    setSelected(path);
  }, []);

  return (
    <nav className="flex items-center justify-between animate-in sm:mr-10 sm:flex-col sm:items-start sm:justify-start sm:gap-6 md:w-1/4">
      {!loadingTags && (
        <>
          <Link
            href="/"
            onClick={handleSelect}
            className="text-xl font-bold hover:text-gray-400 sm:text-3xl"
          >
            LUCAS SHTORACHE
          </Link>

          <div className="hidden animate-in sm:block">
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
