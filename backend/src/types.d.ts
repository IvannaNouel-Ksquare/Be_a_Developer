import mongoose, { Schema } from 'mongoose';

interface IAnswer {
  answer_id: number;
  user_id?: string;
  body: string;
  createdAt: Date;
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


