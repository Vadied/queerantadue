import { Schema, models, model } from "mongoose";
import { ActualCategory } from "../categories/ActualCategory";

const schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: ActualCategory,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const ActualQuestion = models.ActualQuestion || model("ActualQuestion", schema);
