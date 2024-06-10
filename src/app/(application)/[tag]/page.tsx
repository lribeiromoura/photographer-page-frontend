'use client';
import 'photoswipe/dist/photoswipe.css';
import { GalleryPhoto } from '@/components/GalleryPhoto';
import { useListPhotos } from '@/hooks/useListPhotos';
import { useEffect } from 'react';
import { useMediaTags } from '@/hooks/useTags';
import { GalleryVideo } from '@/components/GalleryVideo';

export default function PhotoPage({ params }: { params: { tag: string } }) {
  const { tags } = useMediaTags();
  const { images, loading, index, setIndex, fetchImages } = useListPhotos();
  const tag = tags.find((tag) => tag.name === decodeURIComponent(params.tag));
  useEffect(() => {
    if (tags.length > 0) {
      fetchImages(tag?._id);
    }
  }, [params.tag, tags]);
  return (
    !loading &&
    images.length > 0 && (
      <>
        {tag?.type === 'PHOTO' && (
          <GalleryPhoto images={images} index={index} setIndex={setIndex} />
        )}
        {tag?.type === 'VIDEO' && <GalleryVideo videos={images} />}
      </>
    )
  );
}
