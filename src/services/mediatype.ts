import { MediaType } from "@/@types/mediatype";

export const getAllMediaTypeService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/mediatypes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: MediaType[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching media type", error);
  }
};
export const mediaTypeByIdService = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/mediatypes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")} `,
        },
      }
    );
    const data: MediaType = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching media type", error);
  }
};

export const createMediaTypeService = async (mediatype: MediaType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/mediatypes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")} `,
        },
        body: JSON.stringify(mediatype),
      }
    );
    const data: MediaType = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating mediatype", error);
  }
};

export const editMediaTypeService = async (mediatype: MediaType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/mediatypes/${mediatype._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(mediatype),
      }
    );
    const data: MediaType = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing mediatype", error);
  }
};

export const deleteMediaTypeService = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/mediatypes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data: MediaType = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting mediatype", error);
  }
};
