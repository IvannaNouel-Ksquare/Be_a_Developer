import mongoose, { Schema } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

interface IUser{
  user_id: string;
  role: UserRole;
}

interface IAnswer {
  answer_id: number;
  answerText: string;
  createdAt: Date;
  is_correct: boolean;
}

interface ICategory {
  name: string;
}

export interface IQuestion extends IAnswer {
  question_id: number;
  user_id?: string;
  title: string;
  body: string;
  category: string; 
  difficulty: Difficulty;
  answers: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
}


