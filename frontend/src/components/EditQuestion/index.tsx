import { useEffect, useState } from "react";
import "./style.css";
import Question, { Difficulty } from "../Question";
import { IQuestion } from "../Question";
import FormQuestion, { Category } from "../FormQuestion";

const EditQuestion = () => {
  const dateString = "2023-03-01"; 
  const date = new Date(dateString); 

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [formData, setFormData] = useState<IQuestion>({
    _id: "",
    question_id: 0,
    title: "",
    body: "",
    difficulty: Difficulty.EASY,
    category: ["string1"],
    answers: [],
    answer_id: 0,
    answerText: "",
    is_correct: false,
    createdAt: date,
    updatedAt: date,
  });

  const [showForm, setShowForm] = useState(false);

  const [idAEditar, setIdAEditar] = useState("-1");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "https://be-a-developer-quiz.onrender.com/question"
        );
        const data = await res.json();
        const quesData = await data.questions;
        if (quesData) {
          setQuestions(quesData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

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

  const openEditForm = (questionId: string) => {
    const questionToEdit = questions.find((q) => q._id === questionId);
    if (questionToEdit) {
      setFormData(questionToEdit);
      setIdAEditar(questionId);
      setShowForm(true);
    }
  };

  const updateQuestion = (questionId: string, updatedQuestion: IQuestion) => {
    fetch(
      `https://be-a-developer-quiz.onrender.com/question/update/${questionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestion),
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        setQuestions(
          questions.map((question) =>
            question._id === dataResponse.data._id
              ? dataResponse.data
              : question
          )
        );
        setShowForm(false);
      });
  };
  


  return (
    <>
      {showForm && (
        <div >
          <button className="new-btn" onClick={() => setShowForm(false)}>
            Close
          </button>
          <FormQuestion
            initData={formData}
            onClickFn={(updatedQuestion) => updateQuestion(idAEditar, updatedQuestion)}
            btnTxt={"Edit Question"}
          ></FormQuestion>
        </div>
      )}
      <div className="grid-container">
        {questions.map((question, _id) => {
          return (
            <Question
              key={question._id}
              question={question}
              onClickFn={openEditForm}
              _id={question._id}
              btnTxt={"Edit"}
            />
          );
        })}
      </div>
    </>
  );
};

export default EditQuestion;
