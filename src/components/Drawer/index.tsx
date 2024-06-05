// components/Drawer.js
import { useEffect, useRef, useState } from 'react';
import { MenuIcon, XCircle } from 'lucide-react';

interface DrawerProps {
  children: React.ReactNode;
}

const Drawer = ({ children }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!drawerRef.current) return;
    if (isOpen && !drawerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={toggleDrawer} className="z-50 rounded-md p-2">
        <MenuIcon />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          onClick={toggleDrawer}
        ></div>
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        ref={drawerRef}
      >
        <button
          onClick={toggleDrawer}
          className="absolute right-4 top-4 rounded-md p-2"
        >
          <XCircle />
        </button>
        <div className="mt-4 overflow-y-auto pl-6 pt-2" onClick={toggleDrawer}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
