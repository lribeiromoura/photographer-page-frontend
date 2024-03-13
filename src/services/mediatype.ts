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
