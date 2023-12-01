import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    character: {
      type: String,
      required: true,
      unique: true
    },
    quests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Quests',
        default: []
      }
    ]
  },
  { timestamps: true }
);

export const Adventurers = models.Adventurers || model('Adventurers', schema);
