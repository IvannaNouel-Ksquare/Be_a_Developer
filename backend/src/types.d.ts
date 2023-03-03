import mongoose, { Schema } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

interface IUser{
  user_id: string;
  role: UserRole;
  match: string;
}

interface IAnswer {
  answer_id: number;
  answerText: string;
  createdAt: Date;
  is_correct: boolean;
}

interface IMatchHistory extends IAnswer{
  user_id: string;
  date: Date;
  category: string;
  answers: IAnswer[];
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


