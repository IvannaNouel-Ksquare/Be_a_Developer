import { useNavigate } from "react-router-dom";

//components
import DefaultMenuTemplate from "../../templates/DefaultMenuTemplate";
import ButtonControl from "../../components/Button";

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
      <DefaultMenuTemplate>
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
      </DefaultMenuTemplate>
  );
};

export default Home;
