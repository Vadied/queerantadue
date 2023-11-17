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
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    image: String,
  },
  { timestamps: true }
);

schema.plugin(autopopulate);

export const User = models.User || model("User", schema);
