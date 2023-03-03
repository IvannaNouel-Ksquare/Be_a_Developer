import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { useDataContext } from "../../context/context";
import { toast } from "react-toastify";
import { QuestionsByDifficulty } from "../QuizHtml";

interface Question {
  body: ReactNode;
  _id: string;
  title: string;
  category: string[];
  difficulty: string;
  answers: {
    _id: string;
    answerText: string;
    is_correct: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface Answer {
  _id: string;
  answerText: string;
  is_correct: boolean;
}

interface IMatchHistory {
  user_id: string;
  date: Date;
  category: string;
  answers: {
    _id: string;
    answerText: string;
    is_correct: boolean;
  }[];
}

const QuizHtml = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(90);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [matchHistory, setMatchHistory] = useState<IMatchHistory[]>([]);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);

  const [helpUsed, setHelpUsed] = useState(false);
  let filteredAnswers: Answer[] = [
    { _id: "1", answerText: "Answer 1", is_correct: true },
    { _id: "2", answerText: "Answer 2", is_correct: false },
    { _id: "3", answerText: "Answer 3", is_correct: false },
  ];
  const navigate = useNavigate();
  const context = useDataContext();

  function handleAnswerSubmit(isCorrect: any, e: any) {
    const currentQuestion = questions[preguntaActual];
    const difficulty = currentQuestion.difficulty;
    let points = 0;

    if (difficulty === "Easy") {
      points = 1;
    } else if (difficulty === "Intermediate") {
      points = 2;
    } else if (difficulty === "Hard") {
      points = 3;
    }

    // add points
    if (isCorrect) setPuntuación(puntuación + points);

    // add question styles
    e.target.classList.add(isCorrect ? "correct" : "incorrect");

    // move to the next question
    setTimeout(() => {
      if (preguntaActual === questions.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(90);
      }
    }, 1500);
  }

  useEffect(() => {
    //sql
    const categoryId = "63f824c9313a5b593a06f033";
    const fetchQuestions = async (categoryId: string) => {
      const res = await fetch(
        `https://be-a-developer-quiz.onrender.com/question/${categoryId}`
      );
      const data = await res.json();
      const allQuestions = data.questions;

      // Filter the questions by difficulty
      const questionsByDifficulty: QuestionsByDifficulty = {
        hard: allQuestions.filter(
          (q: { difficulty: string }) => q.difficulty === "Hard"
        ),
        intermediate: allQuestions.filter(
          (q: { difficulty: string }) => q.difficulty === "Intermediate"
        ),
        easy: allQuestions.filter(
          (q: { difficulty: string }) => q.difficulty === "Easy"
        ),
      };

      // Assign the questions to their respective positions
      const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const questions: Question[] = [];

      // Add the hard questions to positions 3, 6, and 10
      questionsByDifficulty.hard.forEach((q, i) => {
        const position = [3, 6, 10][i];
        questions[position - 1] = q;
      });

      // Add the intermediate questions to positions 2, 5, 8, and 9
      questionsByDifficulty.intermediate.forEach((q, i) => {
        const position = [2, 5, 8, 9][i];
        questions[position - 1] = q;
      });

      // Add the easy questions to positions 1, 4, and 7
      questionsByDifficulty.easy.forEach((q, i) => {
        const position = [1, 4, 7][i];
        questions[position - 1] = q;
      });
      console.log(questionsByDifficulty);

      setQuestions(questions);
    };
    fetchQuestions(categoryId);
  }, []);

  const saveMatchHistory = async (data: any) => {
    try {
      const res = await fetch(
        "https://be-a-developer-quiz.onrender.com/user/match-history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log("response:", res);
      const { data: newMatch } = await res.json();
      setMatchHistory([...matchHistory, newMatch]);
      toast.success("Match history successfully saved!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleHelp = () => {
    if (!helpUsed) {
      const incorrectOptions = questions[preguntaActual].answers.filter(
        (opcion) => !opcion.is_correct
      );
      const shuffledOptions = shuffle(incorrectOptions);
      setDisabledOptions(
        shuffledOptions.slice(0, 2).map((opcion) => opcion.answerText)
      );
      setHelpUsed(true);
    }
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      <main className="app">
        <div className="juego-terminado">
          <span>
            You got {puntuación} out of {20}
          </span>
          <span>{puntuación < 15 ? "You Lost" : "Winner!"}</span>
          {puntuación === 20 && (
            <button onClick={() => navigate("/hard-quiz")}>Bonus Quiz(HARD)</button>
          )}
          <button onClick={() => navigate("/home")}> Play again</button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setPreguntaActual(0);
            }}
          >
            See Answers
          </button>
          <button
            onClick={() =>
              saveMatchHistory({
                user_id: context.userId,
                date: new Date().toLocaleString("en-US"),
                category: "Sql",
                answers: questions.map(({ _id, answers }) => ({
                  _id,
                  answerText: answers.find((a) => a.is_correct)?.answerText,
                  is_correct: false,
                })),
              })
            }
          >
            Save Match History
          </button>
        </div>
      </main>
    );

  if (answersShown)
    return (
      <main className="app">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span> Question {preguntaActual + 1} de</span> {questions.length}
          </div>
          <div className="titulo-pregunta">
            {questions[preguntaActual].title}
          </div>
          <div>
            {
              questions[preguntaActual].answers.filter(
                (opcion) => opcion.is_correct
              )[0].answerText
            }
          </div>
          <button
            onClick={() => {
              if (preguntaActual === questions.length - 1) {
                navigate("/home");
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === questions.length - 1 ? "Play again" : "next"}
          </button>
        </div>
      </main>
    );

  return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span>Question {preguntaActual + 1} de</span> {questions.length}
        </div>
        <div className="titulo-pregunta">
          {questions.length > 0 && questions[preguntaActual].title}
        </div>
        {helpUsed ? (
          <div className="help-used">Help has already been used.</div>
        ) : (
          <button className="help-button" onClick={handleHelp}>
            Use Help (eliminate 2 incorrect answers)
          </button>
        )}
        {!areDisabled ? (
          <span className="tiempo-restante">Time: {tiempoRestante} </span>
        ) : (
          <button
            onClick={() => {
              setTiempoRestante(90);
              setAreDisabled(false);
              if (preguntaActual === questions.length - 1) {
                setIsFinished(true);
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            Continue
          </button>
        )}
      </div>
      {questions.length > 0 && (
        <div className="lado-derecho">
          {questions[preguntaActual].answers.map((respuesta) => (
            <button
              disabled={
                areDisabled || disabledOptions.includes(respuesta.answerText)
              }
              key={respuesta.answerText}
              onClick={(e) => handleAnswerSubmit(respuesta.is_correct, e)}
            >
              {respuesta.answerText}
            </button>
          ))}
          {helpUsed && (
            <div className="help-used">
              Two incorrect answers have been eliminated!
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default QuizHtml;
