import { Schema, model, models } from 'mongoose';
import { Profile } from '@/@types/profile';

export const ProfileSchema = new Schema<Profile>(
  {
    name: String,
    description: String,
    data: Buffer,
    isPublished: Boolean,
  },
  {
    timestamps: true,
  },
);

const IProfile = models.profile || model('profile', ProfileSchema);
export default IProfile;
