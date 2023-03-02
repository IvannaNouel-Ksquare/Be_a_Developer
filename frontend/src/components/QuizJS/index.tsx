import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

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

const QuizJavaScript = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [matchHistory, setMatchHistory] = useState<IMatchHistory[]>([]);
  const [helpUsed, setHelpUsed] = useState(false);
  let filteredAnswers: Answer[] = [
    { _id: '1', answerText: 'Answer 1', is_correct: true },
    { _id: '2', answerText: 'Answer 2', is_correct: false },
    { _id: '3', answerText: 'Answer 3', is_correct: false }
  ];
  const navigate = useNavigate();

  function handleAnswerSubmit(isCorrect: any, e: any) {
    // añadir puntuación
    if (isCorrect) setPuntuación(puntuación + 1);
    // añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // cambiar a la siguiente pregunta

    setTimeout(() => {
      if (preguntaActual === questions.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(10);
      }
    }, 1500);
  }

  useEffect(() => {
    //JavaScript
    const categoryId = "63f81bf1a4dc0282423ce727";
    const fetchQuestions = async (categoryId: string) => {
      const res = await fetch(
        `https://be-a-developer-quiz.onrender.com/question/${categoryId}`
      );
      const data = await res.json();
      console.log(data);
      setQuestions(data.questions);
    };
    fetchQuestions(categoryId);
  }, []);

  const saveMatchHistory = async (data: any) => {
    try {
      const res = await fetch(
        "https://be-a-developer-quiz.onrender/user/match-history",
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
    
    const currentAnswers = [...questions[preguntaActual].answers];
    const correctAnswer = currentAnswers.find((answer) => answer.is_correct);
    const incorrectAnswers = currentAnswers.filter(
      (answer) => !answer.is_correct
    );
     filteredAnswers = [
      correctAnswer,
      ...shuffle(incorrectAnswers).slice(0, filteredAnswers.length - 2),
    ];
    const updatedQuestions = [...questions];
    updatedQuestions[preguntaActual].answers = filteredAnswers;
    setQuestions(updatedQuestions);
    setHelpUsed(true);
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
            {" "}
            You got {puntuación} of {questions.length}{" "}
          </span>
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
              setTiempoRestante(10);
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
              disabled={areDisabled}
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

export default QuizJavaScript;
