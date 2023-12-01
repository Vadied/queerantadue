import { Schema, models, model } from "mongoose";

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
    quest: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export const Quests = models.Quests || model("Quests", schema);
