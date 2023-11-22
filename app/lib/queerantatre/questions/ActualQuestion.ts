import { Schema, models, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";
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
        type: ActualCategory.schema,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(autopopulate);

export const ActualQuestion = models.ActualQuestion || model("ActualQuestion", schema);
