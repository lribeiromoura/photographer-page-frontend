"use client";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Media } from "@/@types/media";

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
    zoom: false,
    close: false,
    counter: false,
    bgOpacity: 0.9,
    padding: { top: 20, bottom: 40, left: 100, right: 100 },
  };
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center">
      <Gallery key={index} options={options}>
        {images.map((image: any, i: number) => {
          return (
            <Item
              key={i}
              id={image.id}
              original={image.src}
              thumbnail={image.src}
              width={image.width}
              height={image.height}
            >
              {({ ref, open }) => (
                <Image
                  className="border-2"
                  alt=""
                  ref={ref}
                  width={image.width}
                  height={image.height}
                  onClick={open}
                  loader={() => image.src}
                  src={image.src}
                />
              )}
            </Item>
          );
        })}
      </Gallery>
    </div>
  );
};
