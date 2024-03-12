"use client";

import React from "react";
import "photoswipe/dist/photoswipe.css";
import { GalleryPhoto } from "@/components/GalleryPhoto";
import { useListPhotos } from "@/hooks/useListPhotos";

export default function Home() {
  const { images, loading, index, setIndex } = useListPhotos();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {!loading && images.length > 0 && (
        <GalleryPhoto images={images} index={index} setIndex={setIndex} />
      )}
    </div>
  );
}
