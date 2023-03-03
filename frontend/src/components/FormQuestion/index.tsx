import React, { useState, useEffect } from "react";
import { Difficulty, IQuestion } from "../Question";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./style.css";
export interface Props {
  onClickFn: (question: IQuestion) => void;
  btnTxt: string;
  initData?: IQuestion;
}
export interface Category {
  _id: string;
  name: string;
}
const FormQuestion = ({ onClickFn, btnTxt, initData }: Props) => {
  const [title, setTitle] = useState(initData ? initData.title : "");
  const [body, setBody] = useState(initData ? initData.body : "");
  const [category, setCategory] = useState(
    initData ? initData.category[0] : ""
  );
  const [difficulty, setDifficulty] = useState(
    initData ? initData.difficulty : Difficulty.EASY
  );
  const [answers, setAnswers] = useState(
    initData
      ? initData.answers
      : [
          { answer_id: 1, answerText: "", is_correct: false },
          { answer_id: 2, answerText: "", is_correct: false },
          { answer_id: 3, answerText: "", is_correct: false },
          { answer_id: 4, answerText: "", is_correct: false },
        ]
  );
  const navigate = useNavigate();

  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://be-a-developer-quiz.onrender.com/category"
        );
        const data = await res.json();
        const categories = data.categories.map((category: any) => {
          console.log(category);
          return { name: category._id };
        });
        console.log(categories);
        setCategoryOptions(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAnswerTextChange = (id: number, text: string) => {
    const updatedAnswers = [...answers];
    const index = updatedAnswers.findIndex((a) => a.answer_id === id);
    updatedAnswers[index] = { ...updatedAnswers[index], answerText: text };
    setAnswers(updatedAnswers);
  };

  const handleIsCorrectChange = (id: number, value: boolean) => {
    const updatedAnswers = [...answers];
    const index = updatedAnswers.findIndex((a) => a.answer_id === id);
    updatedAnswers[index] = {
      ...updatedAnswers[index],
      is_correct: value,
    };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please enter a title", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!body) {
      toast.error("Please enter a body", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!difficulty || !category || answers.length < 2) {
      toast.error("Please fill out all required fields", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const data: IQuestion = {
      question_id: initData ? initData.question_id : 0,
      user_id: initData ? initData.user_id : "",
      title: title,
      body: body,
      difficulty: difficulty,
      answers: answers,
      category: [category],
      createdAt: initData ? initData.createdAt : new Date(),
      updatedAt: new Date(),
      answer_id: 0,
      answerText: "",
      is_correct: false,
      _id: "",
    };
    onClickFn(data);
    navigate("/dashboard");
  };

  const parseDifficulty = (value: string): Difficulty => {
    switch (value) {
      case "EASY":
        return Difficulty.EASY;
      case "INTERMEDIATE":
        return Difficulty.INTERMEDIATE;
      case "HARD":
        return Difficulty.HARD;
      default:
        throw new Error(`Invalid difficulty value: ${value}`);
    }
  };

  const categoryOptionsNames = [
    { name: "JavaScript", _id: "63f81bf1a4dc0282423ce727" },
    { name: "Html", _id: "63f824bf313a5b593a06f030" },
    { name: "Sql", _id: "63f824c9313a5b593a06f033" },
    { name: "Css", _id: "63f824b8313a5b593a06f02d" },
  ];

  const matchedCategory = categoryOptionsNames.find(
    (cat) => cat._id === category
  );

  return (
    <div className="container-form">
      <form className="form-question" onSubmit={handleSubmit}>
        <div className={`formQ`}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="formQ">
          <label htmlFor="category">Category:</label>
          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categoryOptionsNames.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {matchedCategory && matchedCategory._id === cat._id
                  ? matchedCategory.name
                  : cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="formQ">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            onChange={(e) => setDifficulty(parseDifficulty(e.target.value))}
          >
            value={difficulty}
            <option value="EASY">Easy</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
        <div className="formQ">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        <div className="formQ">
          <label>Answers:</label>
          {answers.map((answer, idx) => (
            <div key={answer.answer_id} className="formQ">
              <label>Answer {idx + 1}:</label>
              <input
                type="text"
                value={answer.answerText}
                onChange={(e) =>
                  handleAnswerTextChange(answer.answer_id, e.target.value)
                }
              />
              <label>Correct:</label>
              <select
                value={answer.is_correct ? "true" : "false"}
                onChange={(e) =>
                  handleIsCorrectChange(
                    answer.answer_id,
                    e.target.value === "true"
                  )
                }
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          ))}
        </div>
        <input className="input-btn" type="submit" value={btnTxt} />
      </form>
    </div>
  );
};

export default FormQuestion;
