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
      <div className="container-home">
        <div className="rules">
          <h1>Rules</h1>
          <ul>
      <li>Each question will have a time limit of 1:30 mins</li>
      <li>A player will have 1 help for each round, that help will be to eliminate 2 choices from 1 question.</li>
      <li>Each question will provide the player with points based on the difficulty of the question.</li>
      <li>A player must answer all 10 questions correctly or score the highest amount of points to win.</li>
    </ul>
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
