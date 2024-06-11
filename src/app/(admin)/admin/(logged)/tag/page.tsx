'use client';

import { useMediaTags } from '@/hooks/useTags';
import DataTable from '../components/DataTable';
import { Header } from '../components/Header';
import { Tag } from '@/@types/tag';
import { ColumnDef } from '@tanstack/react-table';
import { TagActions } from './components/AddEditTag/components/TagActions';
import { useState } from 'react';
import { AddEditTag } from './components/AddEditTag';
import { MediaType } from '@/@types/media';

export default function TagPage() {
  const { loadingTags, tags, deleteTag, editTag, createTag } = useMediaTags();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const mediaTypes = Object.entries(MediaType).map(([key, value]) => ({
    name: key,
  }));

  const handleEditTag = (tag: Tag) => {
    editTag(tag);
  };

  const handleDeleteTag = (tag: Tag) => {
    if (tag && tag._id) {
      deleteTag(tag._id);
    }
  };
  const handleAddTag = (tag: Tag) => {
    createTag(tag);
    setOpenCreateModal(false);
  };

  const columns: ColumnDef<Tag>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const tag = row.original as Tag;

        return (
          <TagActions
            onDelete={() => handleDeleteTag(tag)}
            onEdit={(editTag) => handleEditTag(editTag)}
            tag={tag}
            mediaTypes={mediaTypes}
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="w-full py-10">
        <Header
          title="Tag"
          haveButton={true}
          buttonTitle="Adicionar Tag"
          buttonCallback={() => setOpenCreateModal(true)}
          isButtonModal={true}
          openModal={openCreateModal}
          setOpenModal={setOpenCreateModal}
          isButtonDisabled={tags.length >= 10}
          tootipContent={
            tags.length >= 10 ? 'Você atingiu o limite de tags' : null
          }
          modalContent={
            <AddEditTag
              onConfirm={(createdTag) => handleAddTag(createdTag)}
              mediaTypes={mediaTypes}
            />
          }
        />
        <section className="pt-4">
          <DataTable
            columns={columns}
            data={tags}
            loading={loadingTags}
            titleNotFound={'Perfil não encontrado'}
            subtitleNotFound="Utilize o botão cadastrar para adicionar um novo perfil."
          />
        </section>
      </div>
    </>
  );
}
