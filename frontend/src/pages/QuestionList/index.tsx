import QuestionList from "../../components/QuestionsList";
import DefaultNavBarAdminTemplate from "../../templates/DefaultNavBarAdminTemplate ";
import "./style.css";

const QuestionListView = () => {
  return (
    <DefaultNavBarAdminTemplate>
      <div className="qst-list">
        <QuestionList/>
      </div>
    </DefaultNavBarAdminTemplate>
  );
};

export default QuestionListView;
