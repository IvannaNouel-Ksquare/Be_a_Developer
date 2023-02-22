import mongoose, { Schema } from 'mongoose';

interface IUser {
  user_id:string;
  name: string;
  email: string;
  role:string;
  password: string;
}

interface IAnswerOption {
  text: string;
  is_correct: boolean;
}

interface IAnswer {
  answer_id: number;
  answerText: string;
  createdAt: Date;
  is_correct: boolean;
  options: IAnswerOption[];
}

export interface IQuestion extends IAnswer {
  question_id: number;
  user_id?: string;
  title: string;
  body: string;
  category: string[];
  answers: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
}


