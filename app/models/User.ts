import { Schema, models, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
  },
  { timestamps: true }
);

schema.plugin(autopopulate);

export const User = models.User || model("User", schema);
