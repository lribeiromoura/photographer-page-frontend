import { useEffect, useState } from "react";
import { Tag } from "@/@types/tag";
import { getAllMediaTags } from "@/services/tag";

export const useMediaTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const getAllTags = async () => {
    setLoadingTags(true);
    try {
      const response = await getAllMediaTags();

      if (response) {
        setTags(response);
      }
      return response;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingTags(false);
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return {
    loadingTags,
    tags,
    setTags,
    getAllTags,
  };
};
