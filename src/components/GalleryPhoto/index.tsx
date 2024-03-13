"use client";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Media } from "@/@types/media";

interface GalleryPhotoProps {
  images: Media[];
  index: number;
  setIndex: (index: number) => void;
}

export const GalleryPhoto = ({
  images,
  index,
  setIndex,
}: GalleryPhotoProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center">
      <Gallery key={index} options={{}}>
        {images.map((image: any, i: number) => {
          return (
            <Item
              key={i}
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
                  onClick={(e) => {
                    setIndex(i);
                    open(e);
                  }}
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
