import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonControl from "../../components/Button";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";
import "./style.css";

interface Question {
  body: ReactNode;
  _id: string;
  title: string;
  category: string[];
  difficulty: string;
  answers: {
    _id: string;
    answerText: string;
    is_correct: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}
const Admin = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("https://be-a-developer-quiz.onrender.com/question");
      const data = await res.json();
      setQuestions(data.questions);
    };
    fetchQuestions();
  }, []);

  const handleQuestionClick = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  return (
    <DefaultNavBarTemplate>
      <div className="container">
        <h1>Questions</h1>
        <ul>
          {questions.map((question) => (
            <li key={question._id}>
              <button className="question-button" onClick={() => handleQuestionClick(question._id)}>
                <h3>{question.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </DefaultNavBarTemplate>
  );
};

export default Admin;
