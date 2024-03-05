export interface Media {
  _id?: string;
  name: string;
  description: string;
  filename: string;
  url: string;
  isPublished: boolean;
  tags: string;
  type: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type MediaCreate = Exclude<
  Media,
  "_id" | "__v" | "createdAt" | "updatedAt"
>;

export enum MediaTags {
  SHOW = "Show",
  CLIP = "Clip",
  PLACE = "Place",
  EVENT = "Event",
  PEOPLE = "People",
  OTHER = "Other",
}

export enum MediaType {
  VIDEO = "Video",
  PHOTO = "Photo",
}
