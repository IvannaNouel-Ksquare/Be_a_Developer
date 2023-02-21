import { Request, Response } from 'express';
import { Answer } from '../models/answerModel';
import { Question } from '../models/QuestionModel';

export const createAnswerForQuestion = async (req: Request, res: Response) => {
    const questionId = req.params.questionId;
    const { body, is_correct, options } = req.body;

    try {
        const answer = new Answer({
            body,
            is_correct,
            options,
        });

        const question = await Question.findByIdAndUpdate(questionId);

        if (!question) {
            return res.status(404).json({
                error: 'Question not found'
            });
        }

        question.answers.push(answer);

        await question.save();

        res.status(201).json({
            question
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error'
        });
    }
};
