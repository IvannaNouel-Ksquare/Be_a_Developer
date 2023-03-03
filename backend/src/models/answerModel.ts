import { model, Schema } from 'mongoose';
import { IAnswer } from '../types';


const answerSchema = new Schema<IAnswer>({
  answerText: { type: String, required: true },
  is_correct: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
},
  {
    collection: 'questions',
  });


export const Answer = model('Answer', answerSchema);
