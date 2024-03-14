import { useEffect, useState } from "react";
import {
  getAllMediaTypeService,
  mediaTypeByIdService,
  createMediaTypeService,
  editMediaTypeService,
  deleteMediaTypeService,
} from "@/services/mediatype";
import { MediaType } from "@/@types/mediatype";

export const useMediaTypes = () => {
  const [loadingMediaTypes, setLoadingMediaTypes] = useState(false);
  const [mediaTypes, setMediaTypes] = useState<MediaType[]>([]);
  const getAllMediaTypes = async () => {
    setLoadingMediaTypes(true);
    try {
      const response = await getAllMediaTypeService();

      if (response) {
        setMediaTypes(response);
      }
      return response;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingMediaTypes(false);
    }
  };

  const getMediaTypeById = async (id: string) => {
    setLoadingMediaTypes(true);
    try {
      const response = await mediaTypeByIdService(id);

      if (response) {
        setMediaTypes([response]);
      }
      return response;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingMediaTypes(false);
    }
  };

  const createMediaType = async (mediaType: MediaType) => {
    setLoadingMediaTypes(true);
    try {
      const response = await createMediaTypeService(mediaType);

      if (response) {
        await getAllMediaTypes();
      }
      return response;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingMediaTypes(false);
    }
  };

  const editMediaType = async (mediaType: MediaType) => {
    setLoadingMediaTypes(true);
    try {
      const response = await editMediaTypeService(mediaType);

      if (response) {
        await getAllMediaTypes();
      }
      return response;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingMediaTypes(false);
    }
  };

  const deleteMediaType = async (id: string) => {
    setLoadingMediaTypes(true);
    try {
      const response = await deleteMediaTypeService(id);

      if (response) {
        await getAllMediaTypes();
      }
      return response;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingMediaTypes(false);
    }
  };

  useEffect(() => {
    getAllMediaTypes();
  }, []);

  return {
    mediaTypes,
    loadingMediaTypes,
    setMediaTypes,
    getAllMediaTypes,
    getMediaTypeById,
    createMediaType,
    editMediaType,
    deleteMediaType,
  };
};
