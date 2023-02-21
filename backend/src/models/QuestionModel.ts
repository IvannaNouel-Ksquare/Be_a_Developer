import { model, Schema } from 'mongoose';
import {IQuestion } from '../types';

const questionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user_id: { type: String, required: false },
  category: { type: [String], required: true },
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Question = model('Question', questionSchema);
