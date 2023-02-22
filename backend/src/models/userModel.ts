import { model, Schema } from 'mongoose';
import { IUser } from '../types';

export type Role = | 'user' | 'admin';

const userSchema = new Schema<IUser>({
    user_id: { type: String, required: true },
    role: { type: String, required: true, defaultValue: 'user' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = model('User', userSchema);

