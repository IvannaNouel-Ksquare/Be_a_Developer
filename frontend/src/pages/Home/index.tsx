import { useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import ButtonControl from "../../components/Button";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";

//style sheet
import "./style.css";

const Home = () => {
  const navigate = useNavigate();


  const [showCategoryButtons, setShowCategoryButtons] = useState(false);

  const handleCategoryButtonClick = () => {
    setShowCategoryButtons(true);
  };

  const handleCategoryButtonClose = () => {
    setShowCategoryButtons(false);
  };

  const handleCategorySelection = (category: string) => {
    console.log(`Category "${category}" is selected`);
      navigate(`/${category}`);
    
  };

  return (
    <DefaultNavBarTemplate>
      <div className="container-home">
        {/* Render either the "rules" section or the category button list based on the value of showCategoryButtons */}
        {showCategoryButtons ? (
          <div className="rules">
            <div className="category-button-list">
              <ButtonControl
                nameClass={"category-button"}
                label={"HTML"}
                handleClick={() => handleCategorySelection("html")}
              />
              <ButtonControl
                nameClass={"category-button"}
                label={"CSS"}
                handleClick={() => handleCategorySelection("css")}
              />
              <ButtonControl
                nameClass={"category-button"}
                label={"SQL"}
                handleClick={() => handleCategorySelection("SQL")}
              />
              <ButtonControl
                nameClass={"category-button"}
                label={"javaScript"}
                handleClick={() => handleCategorySelection("javascript")}
              />
              <ButtonControl
                nameClass={"category-button-close"}
                label={"Close"}
                handleClick={handleCategoryButtonClose}
              />
            </div>
          </div>
        ) : (
          <div className="rules">
            <h1>Rules</h1>
            <ul>
              <li>Each question will have a time limit of 1:30 mins</li>
              <li>
                A player will have 1 help for each round, that help will be to
                eliminate 2 choices from 1 question.
              </li>
              <li>
                Each question will provide the player with points based on the
                difficulty of the question.
              </li>
              <li>
                A player must answer all 10 questions correctly or score the
                highest amount of points to win.
              </li>
            </ul>

            {/* Render the category button inside the "rules" section */}
            <ButtonControl
              nameClass={"categories"}
              label={"categories"}
              handleClick={handleCategoryButtonClick}
            />
          </div>
        )}
      </div>
    </DefaultNavBarTemplate>
  );
};

export default Home;
