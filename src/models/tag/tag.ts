import { Tag } from '@/@types/tag';
import { Schema, model, models } from 'mongoose';

export const TagSchema = new Schema<Tag>(
  {
    name: String,
    description: String,
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ITag = models.tag || model('tag', TagSchema);
export default ITag;
