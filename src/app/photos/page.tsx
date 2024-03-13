"use client";
import "photoswipe/dist/photoswipe.css";
import { GalleryPhoto } from "@/components/GalleryPhoto";
import { useListPhotos } from "@/hooks/useListPhotos";

export default function PhotoPage() {
  const { images, loading, index, setIndex } = useListPhotos({
    startFetching: true,
  });

  return (
    !loading &&
    images.length > 0 && (
      <GalleryPhoto images={images} index={index} setIndex={setIndex} />
    )
  );
}
