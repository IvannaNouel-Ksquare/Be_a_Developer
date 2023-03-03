import QuizCss from "../../components/QuizCss";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";

import "./style.css";
 
const CssQuiz = () => {
  return (
    <DefaultNavBarTemplate>
    <div className="css-quiz-container">
      <div className="container-quiz-css">
        <QuizCss/>
      </div>
    </div>
    </DefaultNavBarTemplate>

  );
};

export default CssQuiz;

