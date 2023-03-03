import EditQuestion from "../../components/EditQuestion";
import DefaultNavBarAdminTemplate 
from "../../templates/DefaultNavBarAdminTemplate ";
import "./style.css";

const EditQuestionView = () => {
  return (
    <DefaultNavBarAdminTemplate>
      <div className="edit-qst-container">
        <EditQuestion ></EditQuestion>
      </div>
    </DefaultNavBarAdminTemplate>
  );
};

export default EditQuestionView;
