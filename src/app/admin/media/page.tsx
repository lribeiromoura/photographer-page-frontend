"use client";

import { useEffect, useState } from "react";

import { Media } from "@/@types/media";

import { Header } from "../components/Header";
import { SearchMedia } from "./components/SearchMedia";
import { MediaTable } from "./components/MediaTable";
import { Skeleton } from "../components/Skeleton";

import {
  createMedia,
  deleteMedia,
  editMedia,
  getMedia,
} from "@/app/services/media";
import { AddMedia } from "./components/AddMedia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MediaPage() {
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [tags, setTags] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [photos, setPhotos] = useState<Media[]>([]);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState<Media>({} as Media);

  const handleDelete = async () => {
    if (selectedPhoto && selectedPhoto._id) {
      await deleteMedia(selectedPhoto._id);
      setSelectedPhoto({} as Media);
      fetchPhotos();
      setOpenConfirmModal(false);
    }
  };

  const handleAddEdit = async () => {
    try {
      const type = selectedPhoto._id ? "edit" : "add";
      let response;
      if (type === "add") {
        response = await createMedia(selectedPhoto);
      } else {
        response = await editMedia(selectedPhoto);
      }
      if (response?.error || response?.ok === false) {
        console.log(response);
        toast.error(`Error: ${response.message.join(", ")}`);
      } else {
        toast.success(
          `Media ${type === "add" ? "added" : "edited"} successfully`
        );
        fetchPhotos();
        setOpenAddEditModal(false);
        setSelectedPhoto({} as Media);
      }
    } catch (error) {
      console.error("Error adding/editing media", error);
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
        type
      );
      setCount(response.total);
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page, perPage, active, tags, search, type]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
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
          {!loading && photos.length >= 0 && (
            <MediaTable
              photos={photos}
              page={page}
              perPage={perPage}
              setPage={setPage}
              count={count}
              openConfirmModal={openConfirmModal}
              setOpenConfirmModal={setOpenConfirmModal}
              setSelectedPhoto={setSelectedPhoto}
              handleDelete={handleDelete}
              handleEdit={() => setOpenAddEditModal(true)}
            />
          )}
          {loading && (
            <div className="py-4">
              <Skeleton height={7} />
            </div>
          )}
        </div>
      </div>
      <AddMedia
        isOpen={openAddEditModal}
        handleAddMedia={() => handleAddEdit()}
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
