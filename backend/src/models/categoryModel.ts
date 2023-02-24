import { model, Schema } from "mongoose";
import { ICategory } from "../types";

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true },
  });

export const Category = model('Category', categorySchema);
