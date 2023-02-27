import { useNavigate } from "react-router-dom";

//components
import ButtonControl from "../../components/Button";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";

//style sheet
import "./style.css";

const Home = () => {
  /* useNavigate hook from the react-router-dom library,
   which provides the navigate function  */
  const navigate = useNavigate();

  const handleOpenButton = () => {
    navigate("/categories");
  };
  return (
    <DefaultNavBarTemplate>
      <div className="container">
        <div className="rules">
          <h1>Rules</h1>
        </div>
        <ButtonControl
          nameClass={"categories"}
          label={"categories"}
          handleClick={handleOpenButton}
        />
      </div>
    </DefaultNavBarTemplate>
  );
};

export default Home;
