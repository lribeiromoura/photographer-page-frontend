import { Tag } from '@/@types/tag';

export const getAllMediaTagsService = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: Tag[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching media type', error);
  }
};

export const tagByIdService = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')} `,
        },
      },
    );
    const data: Tag = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching media type', error);
  }
};

export const createTagService = async (tag: Tag) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')} `,
      },
      body: JSON.stringify(tag),
    });
    const data: Tag = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating tag', error);
  }
};

export const editTagService = async (tag: Tag) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${tag._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(tag),
      },
    );
    const data: Tag = await response.json();
    return data;
  } catch (error) {
    console.error('Error editing tag', error);
  }
};

export const deleteTagService = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    const data: Tag = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting tag', error);
  }
};
