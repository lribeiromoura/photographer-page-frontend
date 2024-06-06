export type CreateMediaDto = {
  name: string;
  description: string;
  filename?: string | null;
  data: Buffer;
  isPublished: boolean;
  tags: string;
  type: string;
};
