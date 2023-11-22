import { Schema, models, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.plugin(autopopulate);

export const Adventurers = models.Adventurers || model("Adventurers", schema);
