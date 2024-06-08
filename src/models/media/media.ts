import { Media } from '@/@types/media';
import { model, models, Schema } from 'mongoose';

export const MediaSchema = new Schema<Media>(
  {
    name: String,
    description: String,
    filename: {
      type: String,
      required: false,
    },
    data: {
      type: Buffer,
      required: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true,
    },
    tagId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const IMedia = models.media || model('media', MediaSchema);
export default IMedia;
