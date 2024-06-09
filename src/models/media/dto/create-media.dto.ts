export type CreateMediaDto = {
  name: string;
  description: string;
  filename?: string | null;
  data: Buffer;
  isPublished: boolean;
  tagId: string;
  type: string;
  srcVideo?: string;
  src?: string;
};
