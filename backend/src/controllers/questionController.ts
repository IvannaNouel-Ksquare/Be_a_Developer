import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Question } from '../models/QuestionModel';
import { IQuestion } from '../types';

export const createQuestion = async (req: Request, res: Response) => {
    try {
        const { title, body, category } = req.body;

        const exist = await Question.findOne<IQuestion>({ title });
            if (exist) {
                res.status(403).json({
                    message: "title already exists",
                })
                return;
            }
            const newQuestion = new Question({ 
                title,
                body,
                category,
                answers: [],
            });

            await newQuestion.save();

            res.status(201).json({
                message: "Question created",
                newQuestion
            })
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const getAllQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find();

        res.status(200).json(questions);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};