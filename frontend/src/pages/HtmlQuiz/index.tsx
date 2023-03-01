import { useState, useEffect, SetStateAction } from "react";
/* import "./style.css";
 */
const HtmlQuiz = () => {
  const [category, setCategory] = useState("Category 1"); // set initial category
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://be-a-developer-quiz.onrender.com/question")
      .then((response) => response.json())
      .then((data) => {
        const filteredQuestions = data.filter(
          (question: { category: string }) => question.category === category
        );
        console.log(filteredQuestions);
        setQuestions(filteredQuestions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);

  return <div className="html-quiz-container"></div>;
};

export default HtmlQuiz;
