'use client';

import { useEffect, useState } from 'react';

import { Media } from '@/@types/media';

import { Header } from '../components/Header';
import { SearchMedia } from './components/SearchMedia';
import DataTable from './components/MediaTable';

import { createMedia, editMedia, getMedia } from '@/services/media';
import { AddMedia } from './components/AddMedia';
import { ToastContainer, toast } from 'react-toastify';

import { redirect } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';

export default function MediaPage() {
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [tags, setTags] = useState<string>('all');
  const [type, setType] = useState<string>('all');
  const [count, setCount] = useState(0);
  const page = 1;
  const [perPage, setPerPage] = useState(10);

  const [photos, setPhotos] = useState<Media[]>([]);

  // const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState<Media>({} as Media);

  // const { token } = useLogin();

  const columns: ColumnDef<Media>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'filename',
      header: 'Filename',
    },
    {
      accessorKey: 'isPublished',
      header: 'Published',
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'url',
      header: 'URL',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        // const mediaType = row.original as Media;

        return (
          // <MediaTypeActions
          //   onDelete={() => handleDelete()}
          //   onEdit={(editMediaType) => handleAddEdit()}
          //   mediaType={mediaType}
          // />
          <></>
        );
      },
    },
  ];

  // const handleDelete = async () => {
  //   if (selectedPhoto && selectedPhoto._id) {
  //     await deleteMedia(selectedPhoto._id);
  //     setSelectedPhoto({} as Media);
  //     fetchPhotos();
  //     console.log(openConfirmModal);
  //     setOpenConfirmModal(false);
  //   }
  // };

  const handleAddEdit = async (file: File) => {
    try {
      const type = selectedPhoto._id ? 'edit' : 'add';
      let response;
      if (type === 'add') {
        response = await createMedia(
          {
            ...selectedPhoto,

            isPublished: selectedPhoto.isPublished ? true : false,
          },
          file,
        );
      } else {
        response = await editMedia(selectedPhoto);
      }
      if (response?.error || response?.ok === false) {
        toast.error(`Error: ${response.message.join(', ')}`);
      } else {
        toast.success(
          `Media ${type === 'add' ? 'added' : 'edited'} successfully`,
        );
        fetchPhotos();
        setOpenAddEditModal(false);
        setSelectedPhoto({} as Media);
      }
    } catch (error) {
      console.error('Error adding/editing media', error);
    }
  };

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await getMedia(
        perPage,
        page,
        active,
        search,
        tags,
        type,
      );
      if (response) {
        setCount(response.total);
        setPhotos(response.data);
      }
    } catch (error) {
      console.error('Error fetching photos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      redirect('/admin');
      return;
    }
    fetchPhotos();
  }, [page, perPage, active, tags, search, type]);

  return (
    <>
      <div>
        <div className="py-8">
          <Header
            title="Media"
            haveButton={true}
            buttonTitle="Add Media"
            buttonCallback={() => setOpenAddEditModal(true)}
          />
          <SearchMedia
            setSearch={setSearch}
            setPerPage={setPerPage}
            setActive={setActive}
            setType={setType}
            setTags={setTags}
          />
          {
            <div className="mt-4">
              <DataTable columns={columns} data={photos} loading={loading} />
            </div>
          }
        </div>
      </div>
      <AddMedia
        isOpen={openAddEditModal}
        handleAddMedia={(file) => handleAddEdit(file)}
        handleCancel={() => {
          setOpenAddEditModal(false);
          setSelectedPhoto({} as Media);
        }}
        selectedPhoto={selectedPhoto}
        setSelectedPhoto={setSelectedPhoto}
      />
      <ToastContainer />
    </>
  );
}
