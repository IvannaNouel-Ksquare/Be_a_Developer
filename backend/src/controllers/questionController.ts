import { Request, Response } from 'express';
import { Answer } from '../models/answerModel';
import { Category } from '../models/categoryModel';
import { Question } from '../models/QuestionModel';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const {
      title,
      body,
      category,
      answers,
      difficulty
    } = req.body;

    if (!title || !body || !category || !difficulty || !answers) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }
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
    const { id } = req.params;
    const data = req.body;

    Question.findByIdAndUpdate(id, data, { new: true }, (error, result) => {
      if (error) {
        return res.status(500).json({
          error
        });
      }
      return res.status(200).json({
        message: 'Question updated',
      });
    });
  } catch (error) {
    res.status(500).json({
      error
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
    const questions = await Question.find().populate({
      path: 'answers',
      select: '_id answerText is_correct'
    });
    const filteredQuestions =
      questions.filter(question =>
        question.category.length > 0 && question.answers.length > 0);
    res.status(200).json({
      message: 'Questions fetched successfully',
      questions: filteredQuestions
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

    const question = await Question.findById(questionId).populate({
      path: 'answers',
      select: '_id answerText is_correct'
    });

    if (!question) {
      return res.status(404).json({
        message: 'Question not found'
      });
    }

    const filteredQuestion =
      question.category.length > 0 &&
        question.answers.length > 0 ?
        question : null;
    if (!filteredQuestion) {
      return res.status(404).json({
        message: 'Question not found'
      });
    }

    res.status(200).json({
      message: 'Question fetched successfully',
      question: filteredQuestion
    });

  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

export const getQuestionsByCategoryId = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const questions = await Question.find({ category: categoryId }).populate({
      path: 'answers',
      select: '_id answerText is_correct'
    });
    const filteredQuestions =
      questions.filter(question => question.answers.length > 0);
    res.status(200).json({
      message: 'Questions fetched successfully',
      questions: filteredQuestions
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

