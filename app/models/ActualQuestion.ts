import { Schema, models, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const schema = new Schema(
  {
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
        ref: "ActualCategory",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(autopopulate);

export const ActualQuestion = models.ActualQuestion || model("ActualQuestion", schema);
