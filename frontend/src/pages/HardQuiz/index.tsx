import Quiz from "../../components/Quiz";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";

import "./style.css";
 
const HardQuiz = () => {
  return (
    <DefaultNavBarTemplate>
    <div className="hard-quiz-container">
      <div className="container">
        <Quiz/>
      </div>
    </div>
    </DefaultNavBarTemplate>
  );
};

export default HardQuiz;

