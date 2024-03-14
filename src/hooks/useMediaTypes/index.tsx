import { useEffect, useState } from "react";
import { getAllMediaTypeService } from "@/services/mediatype";
import { MediaType } from "@/@types/mediatype";

export const useMediaTypes = () => {
  const [mediaTypes, setMediaTypes] = useState<MediaType[]>([]);
  const getAllMediaTypes = async () => {
    try {
      const response = await getAllMediaTypeService();

      if (response) {
        setMediaTypes(response);
      }
      return response;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllMediaTypes();
  }, []);

  return {
    mediaTypes,
    setMediaTypes,
    getAllMediaTypes,
  };
};
