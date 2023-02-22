import { model, Schema } from 'mongoose';
import { IAnswer, IAnswerOption } from '../types';

const answerOptionSchema = new Schema<IAnswerOption>({
  text: { type: String, required: true },
  is_correct: { type: Boolean, required: true },
});

const answerSchema = new Schema<IAnswer>({
  answerText: { type: String, required: true },
  is_correct: { type: Boolean, required: true },
  options: { type: [answerOptionSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});


export const Answer = model('Answer', answerSchema);
