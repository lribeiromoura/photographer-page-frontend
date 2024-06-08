import { Media, MediaResponse } from '@/@types/media';
import { createQueryString } from '@/util/createQueryString';

export const getMedia = async (
  limit: number,
  page: number,
  isPublished: string,
  searchString: string,
  tags: string,
  type: string,
) => {
  try {
    const queryParams = createQueryString({
      limit,
      page,
      isPublished,
      searchString,
      tags,
      type,
    });

    const response = await fetch(`/api/medias?${queryParams}  `, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    const data: MediaResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photos', error);
  }
};

export const deleteMedia = async (id: string) => {
  try {
    const response = await fetch(`/api/medias?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error deleting photo', error);
  }
};

export const createMedia = async (media: Media, file: File | null) => {
  try {
    const formData = new FormData();
    formData.append('name', media.name);
    formData.append('description', media.description);
    formData.append('isPublished', media.isPublished ? 'true' : 'false');
    formData.append('tags', JSON.stringify(media.tags));
    formData.append('type', media.type);

    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(`/api/medias`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData,
    });

    return response;
  } catch (error) {
    console.error('Error creating photo', error);
  }
};

export const editMedia = async (media: Media, file?: File | null) => {
  try {
    const formData = new FormData();
    if (media._id) {
      formData.append('_id', media._id);
      formData.append('name', media.name);
      formData.append('description', media.description);
      formData.append('isPublished', media.isPublished ? 'true' : 'false');
      formData.append('tags', JSON.stringify(media.tags));
      formData.append('type', media.type);
    }

    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(`/api/medias?id=${media._id}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData,
    }).then((res) => res.json());
    return response;
  } catch (error: any) {
    console.error('Error editing photo', error);
  }
};
