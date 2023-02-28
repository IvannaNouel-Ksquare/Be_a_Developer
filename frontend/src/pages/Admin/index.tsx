import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonControl from "../../components/Button";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";
import "./style.css";

interface Question {
  _id: string;
  title: string;
  body: string;
  category: string[];
  difficulty: string;
  answers: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
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

  return (
    <DefaultNavBarTemplate>
      <div className="container">
        <h1>Question List</h1>
        {questions.length > 0 ? (
          <ul>
            {questions.map((question) => (
              <li key={question._id}>
                <h2>{question.title}</h2>
                <p>{question.body}</p>
                <p>{question.answers}</p>

              </li>
            ))}
          </ul>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </DefaultNavBarTemplate>
  );
};

export default Admin;
