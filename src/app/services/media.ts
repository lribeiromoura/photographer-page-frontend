import { Media } from "@/@types/media";

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
    const data = await response.json();
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

export const createMedia = async (media: Media) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/medias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(media),
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
