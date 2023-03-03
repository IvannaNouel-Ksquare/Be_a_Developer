import QuizHtml from "../../components/QuizHtml";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";

import "./style.css";
 
const HtmlQuiz = () => {
  return (
    <DefaultNavBarTemplate>
    <div className="html-quiz-container">
      <div className="container">
        <QuizHtml/>
      </div>
    </div>
    </DefaultNavBarTemplate>
  );
};

export default HtmlQuiz;

