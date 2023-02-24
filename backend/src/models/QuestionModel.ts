import { model, Schema } from 'mongoose';
import {IQuestion } from '../types';

enum Difficulty {
  EASY = 'Easy',
  INTERMEDIATE = 'Intermediate',
  HARD = 'Hard',
}

const questionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user_id: { type: String, required: false },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }], 
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  difficulty: { type: String, enum: Object.values(Difficulty), required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Question = model('Question', questionSchema);
