'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Media } from '@/@types/media';

import { Header } from '../components/Header';
import { SearchMedia } from './components/SearchMedia';
import DataTable from './components/MediaTable';

import {
  createMedia,
  deleteMedia,
  editMedia,
  getMedia,
} from '@/services/media';
import { AddProfile } from './components/AddProfile';
import { ToastContainer, toast } from 'react-toastify';

import { redirect } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { MediaTypeActions } from '../mediatype/components/AddEditMediaType/components/MediaTypeActions';
import {
  createProfileService,
  editProfileService,
  getAllProfileService,
} from '@/services/profile';
import { Profile } from '@/@types/profile';

export default function MediaPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<Profile[]>([]);

  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [addEditLoading, setAddEditLoading] = useState(false);

  const [selectedProfile, setSelectedProfile] = useState<Profile>(
    {} as Profile,
  );

  const columns: ColumnDef<Profile>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'isPublished',
      header: 'Published',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const media = row.original as Profile;

        return <></>;
      },
    },
  ];

  const handleDelete = async (media: Profile) => {
    if (media && media._id) {
      await deleteMedia(media._id);
      fetchProfile();
    }
  };

  // const handleEditModal = (media: Media) => {
  //   setSelectedProfile(media);
  //   setOpenAddEditModal(true);
  // };

  const handleAddEdit = async (file?: File) => {
    try {
      setAddEditLoading(true);
      let response;
      if (!file) {
        toast.error('Adicione uma foto');
        return;
      }
      if (file) {
        response = await createProfileService(
          {
            ...selectedProfile,
            isPublished: selectedProfile.isPublished ? true : false,
          },
          file,
        );
        setAddEditLoading(false);
        fetchProfile();
        setOpenAddEditModal(false);
        setSelectedProfile({} as Profile);
      }
    } catch (error) {
      console.error('Error adding/editing media', error);
    } finally {
      setAddEditLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await getAllProfileService();
      if (!response) {
        throw new Error('Failed to fetch profile');
      }
      const profileArr = Array.isArray(response) ? response : [response];
      setProfile(profileArr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div>
        <div className="py-8">
          <Header
            title="Profile"
            haveButton={true}
            buttonTitle="Cadastar Profile"
            buttonCallback={() => setOpenAddEditModal(true)}
          />
          {
            <div className="mt-4">
              <DataTable columns={columns} data={profile} loading={loading} />
            </div>
          }
        </div>
      </div>
      <AddProfile
        isOpen={openAddEditModal}
        handleAddProfile={(file: any) => handleAddEdit(file)}
        handleCancel={() => {
          setSelectedProfile({} as Profile);
          setOpenAddEditModal(false);
        }}
        selectedProfile={selectedProfile}
        setSelectedProfile={setSelectedProfile}
        editMode={selectedProfile._id ? true : false}
        addEditLoading={addEditLoading}
      />

      <ToastContainer />
    </>
  );
}
