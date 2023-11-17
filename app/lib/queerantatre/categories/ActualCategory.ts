import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    label: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const ActualCategory =
  models.ActualCategory || model('ActualCategory', schema);
