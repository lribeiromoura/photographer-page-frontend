export interface Profile {
  _id?: string;
  name: string;
  description: string;
  data?: Buffer;
  isPublished: boolean;
  preview?: string;
  __v?: 0;
}
