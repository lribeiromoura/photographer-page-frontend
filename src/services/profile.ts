import { Profile } from '@/@types/profile';

export const getAllProfileService = async () => {
  try {
    const response = await fetch(`/api/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: Profile[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching media type', error);
  }
};

export const profileByIdService = async (id: string) => {
  try {
    const response = await fetch(`/api/profile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')} `,
      },
    });
    const data: Profile = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching media type', error);
  }
};

export const createProfileService = async (
  profile: Profile,
  file?: File | null | undefined,
) => {
  try {
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('description', profile.description);
    formData.append('isPublished', profile.isPublished ? 'true' : 'false');

    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(`/api/profile`, {
      method: 'POST',
      body: formData,
    });

    return response;
  } catch (error) {
    console.error('Error creating photo', error);
  }
};

export const editProfileService = async (profile: Profile) => {
  try {
    const response = await fetch(`/api/profile?id=${profile._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(profile),
    });
    const data: Profile = await response.json();
    return data;
  } catch (error) {
    console.error('Error editing profile', error);
  }
};

export const deleteProfileService = async (id: string) => {
  try {
    const response = await fetch(`/api/profile?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (response.status === 404 || response.status === 401) {
      throw new Error('Failed to delete profile');
    }
    if (!response.ok) {
      throw new Error('Failed to delete profile');
    }
    const data: Profile = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting profile', error);
    throw error;
  }
};
