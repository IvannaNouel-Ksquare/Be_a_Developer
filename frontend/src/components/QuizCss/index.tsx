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

const QuizCss = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
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
    //css
    const categoryId = "63f824b8313a5b593a06f02d";
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
          <span> Question {preguntaActual + 1} de</span> {questions.length}
        </div>
        <div className="titulo-pregunta">
          {questions.length > 0 && questions[preguntaActual].title}
        </div>
        <div>
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
      </div>
      <div className="lado-derecho">
        {questions.length > 0 &&
          questions[preguntaActual].answers.map((respuesta) => (
            <button
              disabled={areDisabled}
              key={respuesta.answerText}
              onClick={(e) => handleAnswerSubmit(respuesta.is_correct, e)}
            >
              {respuesta.answerText}
            </button>
          ))}
      </div>
    </main>
  );
};

export default QuizCss;
