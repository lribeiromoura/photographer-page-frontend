export interface Profile {
  _id?: string;
  name: string;
  description: string;
  data?: Buffer;
  isPublished: boolean;
  __v?: 0;
}
