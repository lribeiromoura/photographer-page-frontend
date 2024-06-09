'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { Media } from '@/@types/media';
import ContextMenu from '@/components/ContextMenu'; // Importe o ContextMenu
import { set } from 'mongoose';

interface GalleryPhotoProps {
  images: Media[];
  setIndex: (index: number) => void;
  index: number;
}

export const GalleryPhoto = ({
  images,
  setIndex,
  index,
}: GalleryPhotoProps) => {
  const options = {
    arrowPrev: true,
    arrowNext: true,
    zoom: false,
    close: true,
    counter: false,
    bgOpacity: 0.2,
  };

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.style.opacity = '1';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    imageRefs.current.forEach((img) => {
      if (img) {
        observer.observe(img);
      }
    });

    return () => {
      imageRefs.current.forEach((img) => {
        if (img) {
          observer.unobserve(img);
        }
      });
    };
  }, [images]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (contextMenu.visible && e.type === 'click') {
      setContextMenu({
        visible: false,
        x: 0,
        y: 0,
      });
      return;
    }
    if (e.type !== 'click') {
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const closeContextMenu = () => {
    setContextMenu({
      visible: false,
      x: 0,
      y: 0,
    });
  };

  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 p-4">
      <Gallery key={index} options={options}>
        {images.map((image, i) => {
          const imageUrl = `data:image/jpeg;base64,${image.data}`;
          return (
            <Item
              key={i}
              id={image.name}
              original={imageUrl}
              thumbnail={imageUrl}
              caption={image.name}
              cropped={true}
            >
              {({ ref }) => (
                <Image
                  className="mb-6 mt-6 rounded-md border-2 opacity-0 transition-opacity duration-500 ease-in-out"
                  alt={image.name}
                  ref={(el) => {
                    ref(el);
                    imageRefs.current[i] = el;
                  }}
                  width={
                    image.width && image.width > 700 ? 700 : image.width || 300
                  }
                  height={
                    image.height && image.height > 700
                      ? 700
                      : image.height || 300
                  }
                  loader={() => imageUrl}
                  src={imageUrl}
                  loading="lazy"
                  onClick={handleContextMenu}
                  onContextMenu={handleContextMenu}
                />
              )}
            </Item>
          );
        })}
      </Gallery>
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        visible={contextMenu.visible}
        onClose={closeContextMenu}
      />
    </div>
  );
};
