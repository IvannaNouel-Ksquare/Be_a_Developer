import QuizSql from "../../components/QuizSQL";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";
import "./style.css";

const SqlQuiz = () => {
  return (
    <DefaultNavBarTemplate>
      <div className="sql-quiz-container">
        <div className="container">
          <QuizSql />
        </div>
      </div>
    </DefaultNavBarTemplate>
  );
};

export default SqlQuiz;
