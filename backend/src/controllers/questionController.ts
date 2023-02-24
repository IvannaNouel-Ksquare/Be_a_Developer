import { Request, Response } from 'express';
import { Answer } from '../models/answerModel';
import { Category } from '../models/categoryModel';
import { Question } from '../models/QuestionModel';
import { IQuestion } from '../types';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { 
      title, 
      body, 
      category,
      answerText, 
      is_correct,
      options, 
      difficulty } = req.body;

    const exist = await Question.findOne<IQuestion>({ title });
    if (exist) {
      res.status(403).json({
        message: "title already exists",
      })
      return;
    }
    const newAnswer = new Answer({
      answerText,
      is_correct,
      options,
    });
    
    const categoryObj = await Category.findById(category);
    if (!categoryObj) {
      res.status(404).json({
        message: "Category not found",
      })
      return;
    }
    const newQuestion = new Question({
      title,
      body,
      category: categoryObj,
      difficulty,
      answers: [newAnswer],
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

export const updateQuestionById = async (req: Request, res: Response) => {
  try {
    const { 
      questionId,
      categoryId,
      title,
      body,
      answers,
      difficulty } = req.body;

    const question = await Question.findByIdAndUpdate(
      questionId,
      { title, body, answers, category: [categoryId], difficulty },
      { new: true }
    ).populate("category");

    if (!question) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    res.status(200).json({
      message: "Question updated",
      question,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const deleteQuestionById = async (req: Request, res: Response) => {

  const questionId = req.params.questionId;

  try {
    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({
        error: 'Question not found'
      });
    }

    res.status(200).json({
      message: 'Question deleted',
      deletedQuestion
    });
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