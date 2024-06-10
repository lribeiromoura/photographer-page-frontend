import { useEffect, useState } from 'react';
import { Profile } from '@/@types/profile';
import {
  getAllProfileService,
  createProfileService,
  deleteProfileService,
  editProfileService,
  profileByIdService,
} from '@/services/profile';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const getAllProfile = async () => {
    setLoadingProfile(true);
    try {
      const response = await getAllProfileService();

      if (response) {
        setProfile(response);
      }
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const getProfileById = async (id: string) => {
    setLoadingProfile(true);
    try {
      const response = await profileByIdService(id);

      if (response) {
        setProfile([response]);
      }
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const createProfile = async (profile: Profile) => {
    setLoadingProfile(true);
    try {
      const response = await createProfileService(profile);

      if (response) {
        await getAllProfile();
      }
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const editProfile = async (profile: Profile) => {
    setLoadingProfile(true);
    try {
      const response = await editProfileService(profile);

      if (response) {
        await getAllProfile();
      }
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const deleteProfile = async (id: string) => {
    setLoadingProfile(true);
    try {
      const response = await deleteProfileService(id);

      if (response) {
        await getAllProfile();
      }
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    getAllProfile();
  }, []);

  return {
    loadingProfile,
    profile,
    setProfile,
    getAllProfile,
    getProfileById,
    createProfile,
    editProfile,
    deleteProfile,
  };
};
