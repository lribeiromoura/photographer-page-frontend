import { MediaType } from "@/@types/mediatype";
import { Tag } from "@/@types/tag";

export const getAllMediaTags = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: Tag[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching media type", error);
  }
};
