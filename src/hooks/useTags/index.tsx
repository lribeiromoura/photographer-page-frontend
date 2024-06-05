import { useEffect, useState } from 'react';
import { Tag } from '@/@types/tag';
import {
  getAllMediaTagsService,
  createTagService,
  deleteTagService,
  editTagService,
  tagByIdService,
} from '@/services/tag';

export const useMediaTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);

  const getAllTags = async () => {
    setLoadingTags(true);
    try {
      const response = await getAllMediaTagsService();

      if (response) {
        setTags(response);
      }
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingTags(false);
    }
  };

  const getTagById = async (id: string) => {
    setLoadingTags(true);
    try {
      const response = await tagByIdService(id);

      if (response) {
        setTags([response]);
      }
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingTags(false);
    }
  };

  const createTag = async (tag: Tag) => {
    setLoadingTags(true);
    try {
      const response = await createTagService(tag);

      if (response) {
        await getAllTags();
      }
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingTags(false);
    }
  };

  const editTag = async (tag: Tag) => {
    setLoadingTags(true);
    try {
      const response = await editTagService(tag);

      if (response) {
        await getAllTags();
      }
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingTags(false);
    }
  };

  const deleteTag = async (id: string) => {
    setLoadingTags(true);
    try {
      const response = await deleteTagService(id);

      if (response) {
        await getAllTags();
      }
      return response;
    } catch (error) {
      console.log('error', error);
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
    getTagById,
    createTag,
    editTag,
    deleteTag,
  };
};
