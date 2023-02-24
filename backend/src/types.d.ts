import mongoose, { Schema } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

interface IUser{
  user_id: string;
  role: UserRole;
}

interface IAnswerOption {
  text: string;
  is_correct: boolean;
}

interface IAnswer {
  answer_id: number;
  body: string;
  createdAt: Date;
  is_correct: boolean;
  options: IAnswerOption[];
}

interface ICategory {
  name: string;
}

export interface IQuestion extends IAnswer {
  question_id: number;
  user_id?: string;
  title: string;
  body: string;
  category: string[] | ICategory[]; 
  difficulty: Difficulty;
  answers: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
}


