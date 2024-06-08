export interface Media {
  _id?: string;
  name: string;
  description: string;
  filename?: string;
  data: Buffer;
  isPublished: boolean;
  tagId: string;
  tagName?: string;
  type: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
  width?: number;
  height?: number;
  src?: string;
  caption?: string;
}

export type MediaCreate = Exclude<
  Media,
  '_id' | '__v' | 'createdAt' | 'updatedAt'
>;

export enum MediaTags {
  SHOW = 'Show',
  CLIP = 'Clip',
  PLACE = 'Place',
  EVENT = 'Event',
  PEOPLE = 'People',
  OTHER = 'Other',
}

export enum MediaType {
  VIDEO = 'Video',
  PHOTO = 'Photo',
}

export interface MediaResponse {
  data: Media[];
  total: number;
}
