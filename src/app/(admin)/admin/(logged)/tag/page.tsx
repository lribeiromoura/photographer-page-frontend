"use client";

import { useMediaTags } from "@/hooks/useTags";
import DataTable from "../components/DataTable";
import { Header } from "../components/Header";
import { Tag } from "@/@types/tag";
import { ColumnDef } from "@tanstack/react-table";
import { TagActions } from "./components/AddEditTag/components/TagActions";
import { useState } from "react";
import { AddEditTag } from "./components/AddEditTag";
import { useMediaTypes } from "@/hooks/useMediaTypes";

export default function TagPage() {
  const { loadingTags, tags, deleteTag, editTag, createTag } = useMediaTags();
  const { mediaTypes } = useMediaTypes();
  const [openCreateModal, setOpenCreateModal] = useState(false);

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
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      id: "actions",
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
      <div className="py-10 w-full">
        <Header
          title="Tag"
          haveButton={true}
          buttonTitle="Add Tag"
          buttonCallback={() => setOpenCreateModal(true)}
          isButtonModal={true}
          openModal={openCreateModal}
          setOpenModal={setOpenCreateModal}
          modalContent={
            <AddEditTag
              onConfirm={(createdTag) => handleAddTag(createdTag)}
              mediaTypes={mediaTypes}
            />
          }
        />
        <section className="pt-4">
          <DataTable columns={columns} data={tags} loading={loadingTags} />
        </section>
      </div>
    </>
  );
}
