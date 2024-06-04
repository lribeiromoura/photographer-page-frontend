import { Media, MediaResponse } from "@/@types/media";

export const getMedia = async (
  limit: number,
  page: number,
  isPublished: string,
  searchString: string,
  tags: string,
  type: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/medias?limit=${limit}&page=${page}&isPublished=${isPublished}&searchString=${searchString}&tags=${tags}&type=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data: MediaResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching photos", error);
  }
};

export const deleteMedia = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/medias/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error deleting photo", error);
  }
};

export const createMedia = async (media: Media, file: File | null) => {
  try {
    const formData = new FormData();
    formData.append("name", media.name);
    formData.append("description", media.description);
    formData.append("url", media.url);
    formData.append("isPublished", media.isPublished ? "true" : "false");
    formData.append("tags", media.tags);
    formData.append("type", media.type);
    if (file) {
      formData.append("file", file);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/medias`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    }).then((res) => res.json());
    return response;
  } catch (error) {
    console.error("Error creating photo", error);
  }
};

export const editMedia = async (media: Media) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/medias/${media._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(media),
      }
    ).then((res) => res.json());
    return response;
  } catch (error: any) {
    console.error("Error editing photo", error);
  }
};
