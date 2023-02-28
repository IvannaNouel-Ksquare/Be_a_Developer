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
      answers,
      difficulty 
    } = req.body;

    const categoryObj = await Category.findById(category);
    if (!categoryObj) {
      res.status(404).json({
        message: "Category not found",
      });
      return;
    }

    const answerArray = [];
    for (const answer of answers) {
      const { answerText, is_correct, options } = answer;
      const newAnswer = new Answer({
        answerText,
        is_correct,
      });
      await newAnswer.save();
      answerArray.push(newAnswer);
    }

    const newQuestion = new Question({
      title,
      body,
      category: categoryObj,
      difficulty,
      answers: answerArray,
    });
    await newQuestion.save();

    res.status(201).json({
      message: "Question created",
      newQuestion
    });
  } catch (error) {
    res.status(500).json({
       error
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

    res.status(200).json({
      questions
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.questionId;

    const question = await Question.find({id: questionId});

    res.status(200).json({
      question
    });

  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

export const getQuestionsByCategoryId = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const questions = await Question.find({ category: categoryId });

    res.status(200).json({
      questions
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};
