'use client';
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
import { AddMedia } from './components/AddMedia';
import { ToastContainer, toast } from 'react-toastify';

import { redirect } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { getAllMediaTagsService } from '@/services/tag';
import { Tag } from '@/@types/tag';
import { MediaTypeActions } from '../mediatype/components/AddEditMediaType/components/MediaTypeActions';

export default function MediaPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [tags, setTags] = useState<string>('all');
  const [type, setType] = useState<string>('all');
  const [count, setCount] = useState(0);
  const page = 1;
  const [perPage, setPerPage] = useState(10);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const [photos, setPhotos] = useState<Media[]>([]);

  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [addEditLoading, setAddEditLoading] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState<Media>({} as Media);

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
      accessorKey: 'isPublished',
      header: 'Published',
    },
    {
      accessorKey: 'tagName',
      header: 'Tag',
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
        const media = row.original as Media;

        return (
          <>
            <MediaTypeActions
              onDelete={(media: Media) => handleDelete(media)}
              onEdit={() => handleEditModal(media)}
              media={media}
            />
          </>
        );
      },
    },
  ];

  const handleDelete = async (media: Media) => {
    if (media && media._id) {
      await deleteMedia(media._id);
      fetchPhotos();
    }
  };

  const handleAddEdit = async (file?: File) => {
    try {
      const type = selectedPhoto._id ? 'edit' : 'add';
      let response;
      setAddEditLoading(true);
      if (type === 'add') {
        if (!file && selectedPhoto.type === 'PHOTO') {
          toast.error('Adicione uma foto');
          return;
        } else if (selectedPhoto.type === 'VIDEO' && !selectedPhoto.srcVideo) {
          toast.error('Adicione a url de um vídeo do youtube');
          return;
        }
        if (selectedPhoto.type === 'VIDEO' && selectedPhoto.srcVideo) {
          response = await createMedia({
            ...selectedPhoto,
            isPublished: selectedPhoto.isPublished ? true : false,
          });
        }
        if (file && selectedPhoto.type === 'PHOTO') {
          response = await createMedia(
            {
              ...selectedPhoto,
              isPublished: selectedPhoto.isPublished ? true : false,
            },
            file,
          );
        }
      } else {
        response = await editMedia(selectedPhoto, file);
      }
      if (response?.error || response?.ok === false || response?.message) {
        return toast.warn(`Erro: ${response?.message}`);
      } else {
        toast.success(
          `Media ${type === 'add' ? 'Adicionada' : 'Editada'} com sucesso`,
        );
        fetchPhotos();
        setOpenAddEditModal(false);
        setSelectedPhoto({} as Media);
      }
    } catch (error) {
      console.error('Error adding/editing media', error);
    } finally {
      setAddEditLoading(false);
    }
  };

  const handleEditModal = (media: Media) => {
    setSelectedPhoto(media);
    setOpenAddEditModal(true);
  };

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const getTags = await getAllMediaTagsService();
      if (getTags) {
        setAllTags(getTags);
        const response = await getMedia(
          perPage,
          page,
          active,
          search,
          tags,
          type,
        );

        if (response) {
          const parsedPhotos = response.data.map((photo) => {
            return {
              ...photo,
              tagName: getTags.find((tag) => tag._id === photo.tagId)?.name,
            };
          });
          setCount(response.total);
          setPhotos(parsedPhotos);
        }
      }
    } catch (error) {
      console.error('Error fetching photos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dbStatus');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [page, perPage, active, tags, search, type]);

  return (
    <>
      <div>
        <div className="py-8">
          <Header
            title="Media"
            haveButton={true}
            buttonTitle="Cadastar Media"
            buttonCallback={() => setOpenAddEditModal(true)}
          />
          <SearchMedia
            tags={allTags}
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
          setSelectedPhoto({} as Media);
          setOpenAddEditModal(false);
        }}
        selectedPhoto={selectedPhoto}
        setSelectedPhoto={setSelectedPhoto}
        editMode={selectedPhoto._id ? true : false}
        addEditLoading={addEditLoading}
      />

      <ToastContainer />
    </>
  );
}
