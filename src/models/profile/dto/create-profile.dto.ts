export type CreateProfileDto = {
  name: string;
  description: string;
  type: string;
  data: Buffer;
  isPublished: boolean;
};
