import QuizJavaScript from "../../components/QuizJS";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";

import "./style.css";
 
const JsQuiz = () => {
  return (
    <DefaultNavBarTemplate>
    <div className="js-quiz-container">
      <div className="container">
        <QuizJavaScript/>
      </div>
    </div>
    </DefaultNavBarTemplate>
  );
};

export default JsQuiz;

