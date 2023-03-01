import { useEffect, useState } from "react";
import "./style.css";
import Question, { IQuestion } from "../Question";
import FormQuestion from "../FormQuestion";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const QuestionList = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "https://be-a-developer-quiz.onrender.com/question"
        );
        const data = await res.json();
        const questions = await data.questions;
        console.log("questions>", questions);

        if (questions) {
          setQuestions(questions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, []);

  const deleteQuestion = async (questionId: string) => {
    console.log("Deleting question with ID:", questionId);
    try {
      await fetch(
        `https://be-a-developer-quiz.onrender.com/question/delete/${questionId}`,
        {
          method: "DELETE",
        }
      );
      setQuestions(questions.filter((question) => question._id !== questionId));
    } catch (error) {
      console.log(error);
    }
  };

  const createQuestion = async (data: any) => {
    try {
      const res = await fetch(
        "https://be-a-developer-quiz.onrender.com/question/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
     
      console.log("response:", res);
      const { data: newQuestion } = await res.json();
      setQuestions([...questions, newQuestion]);

      setShowForm(false);
    } catch (error) {

      console.log(error);
    }
  };

  return (
    <>
      <button className="new-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close" : "New Question"}
      </button>
      {showForm && (
        <FormQuestion
          onClickFn={createQuestion}
          btnTxt={"Create Question"}
        ></FormQuestion>
      )}

      <div className="grid-container">
        {Array.isArray(questions) &&
          questions.map((question) => (
            <Question
              key={question._id}
              question={question}
              onClickFn={deleteQuestion}
              btnTxt="Delete"
              Icon={DeleteForeverIcon}
              _id={question._id}
            />
          ))}
      </div>
    </>
  );
};

export default QuestionList;
