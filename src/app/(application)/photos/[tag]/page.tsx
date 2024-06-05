'use client';
import 'photoswipe/dist/photoswipe.css';
import { GalleryPhoto } from '@/components/GalleryPhoto';
import { useListPhotos } from '@/hooks/useListPhotos';
import { useEffect } from 'react';

export default function PhotoPage({ params }: { params: { tag: string } }) {
  const { images, loading, index, setIndex, fetchImages } = useListPhotos();
  useEffect(() => {
    fetchImages(params.tag);
  }, [params.tag]);
  return (
    !loading &&
    images.length > 0 && (
      <GalleryPhoto images={images} index={index} setIndex={setIndex} />
    )
  );
}
