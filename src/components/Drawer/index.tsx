// components/Drawer.js
import { use, useEffect, useRef, useState } from "react";
import { MenuIcon, XCircle } from "lucide-react";

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
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={toggleDrawer} className="z-50 p-2 rounded-md">
        <MenuIcon />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        ref={drawerRef}
      >
        <button
          onClick={toggleDrawer}
          className="absolute top-4 right-4  p-2 rounded-md"
        >
          <XCircle />
        </button>
        <div className="pt-2 pl-6 overflow-y-auto mt-4" onClick={toggleDrawer}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
