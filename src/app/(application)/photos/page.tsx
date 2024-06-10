'use client';
import 'photoswipe/dist/photoswipe.css';
import { GalleryPhoto } from '@/components/GalleryPhoto';
import { useListPhotos } from '@/hooks/useListPhotos';

export default function PhotoPage() {
  const { images, setIndex, index } = useListPhotos({
    startFetching: true,
  });

  return <GalleryPhoto images={images} setIndex={setIndex} index={index} />;
}
