import { model, Schema } from 'mongoose';
import { IAnswer } from '../types';

const answerSchema = new Schema<IAnswer>({
    body: { type: String, required: true },
    user_id: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
  });

export const Answer = model('Answer', answerSchema);
