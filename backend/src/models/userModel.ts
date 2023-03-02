import { model, Schema } from "mongoose";
import { IUser } from "../types";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
  }
const userSchema = new Schema<IUser>({
    user_id: { type: String, required: true },
    role: { type: String, required: true, default: UserRole.USER },
    match: { type: String, required: false },

});

export const User = model<IUser>('User', userSchema);
