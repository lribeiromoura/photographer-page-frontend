"use client";

import { useEffect, useState } from "react";
import { getMedia } from "@/app/services/media";
import { Media } from "@/@types/media";
import { getImgSize } from "@/util/getImageSize";

export const useListPhotos = () => {
  const [images, setImages] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  const fetchImages = async () => {
    setLoading(true);

    const data = await getMedia(10, 1, "true", "", "all", "all");
    const parsedData = data?.data.map((image) => ({
      ...image,
      src: image.url,
      caption: image.name,
      width: getImgSize(image.url).width,
      height: getImgSize(image.url).height,
    }));
    if (parsedData && parsedData.length > 0) {
      setImages(parsedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, index, setIndex };
};
