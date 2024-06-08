'use client';
import 'photoswipe/dist/photoswipe.css';
import { GalleryPhoto } from '@/components/GalleryPhoto';
import { useListPhotos } from '@/hooks/useListPhotos';
import { useEffect } from 'react';
import { useMediaTags } from '@/hooks/useTags';

export default function PhotoPage({ params }: { params: { tag: string } }) {
  const { tags } = useMediaTags();
  const { images, loading, index, setIndex, fetchImages } = useListPhotos();
  useEffect(() => {
    if (tags.length > 0)
      fetchImages(tags.find((tag) => tag.name === params.tag)?._id);
  }, [params.tag, tags]);
  return (
    !loading &&
    images.length > 0 && (
      <GalleryPhoto images={images} index={index} setIndex={setIndex} />
    )
  );
}
