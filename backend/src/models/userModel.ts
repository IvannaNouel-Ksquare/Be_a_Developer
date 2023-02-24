import { model, Schema } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
    user_id: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);
