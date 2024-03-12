"use client";
import "photoswipe/dist/photoswipe.css";
import { GalleryPhoto } from "@/components/GalleryPhoto";
import { useListPhotos } from "@/hooks/useListPhotos";

export default function PhotoPage() {
  const { images, loading, index, setIndex } = useListPhotos();

  return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center">
      {!loading && images.length > 0 && (
        <GalleryPhoto images={images} index={index} setIndex={setIndex} />
      )}
    </div>
  );
}
