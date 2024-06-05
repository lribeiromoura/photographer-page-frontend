'use client';

import { useMediaTypes } from '@/hooks/useMediaTypes';
import DataTable from '../components/DataTable';
import { Header } from '../components/Header';
import { MediaType } from '@/@types/mediatype';
import { ColumnDef } from '@tanstack/react-table';
import { MediaTypeActions } from './components/AddEditMediaType/components/MediaTypeActions';
import { useState } from 'react';
import { AddEditMediaType } from './components/AddEditMediaType';

export default function MediaTypePage() {
  const {
    loadingMediaTypes,
    mediaTypes,
    deleteMediaType,
    editMediaType,
    createMediaType,
  } = useMediaTypes();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleEditMediaType = (mediaType: MediaType) => {
    editMediaType(mediaType);
  };

  const handleDeleteMediaType = (mediaType: MediaType) => {
    if (mediaType && mediaType._id) {
      deleteMediaType(mediaType._id);
    }
  };
  const handleAddMediaType = (mediaType: MediaType) => {
    createMediaType(mediaType);
    setOpenCreateModal(false);
  };

  const columns: ColumnDef<MediaType>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const mediaType = row.original as MediaType;

        return (
          <MediaTypeActions
            onDelete={() => handleDeleteMediaType(mediaType)}
            onEdit={(editMediaType) => handleEditMediaType(editMediaType)}
            mediaType={mediaType}
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="w-full py-10">
        <Header
          title="Media Type"
          haveButton={true}
          buttonTitle="Add Media Type"
          buttonCallback={() => setOpenCreateModal(true)}
          isButtonModal={true}
          openModal={openCreateModal}
          setOpenModal={setOpenCreateModal}
          modalContent={
            <AddEditMediaType
              onConfirm={(createdMediaType) =>
                handleAddMediaType(createdMediaType)
              }
            />
          }
        />
        <section className="pt-4">
          <DataTable
            columns={columns}
            data={mediaTypes}
            loading={loadingMediaTypes}
          />
        </section>
      </div>
    </>
  );
}
