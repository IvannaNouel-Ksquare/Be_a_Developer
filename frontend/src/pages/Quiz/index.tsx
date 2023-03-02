import preguntas from "../Quiz/preguntas";
import { useState, useEffect } from "react";
import "../Quiz/style.css";
import useFetchQuestions from "../../hooks/useFetchQuestions";

function Quiz() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(90);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  const [maxPuntuacion, setMaxPuntuacion] = useState(6);

  const [dificulty, setDificulty] = useState(
    preguntas[preguntaActual].dificultad
  );

  //Add the selection option
  function handleAnswerSubmit(isCorrect: any, e: any) {
    // añadir puntuación
    setTimeout(() => {
      if (isCorrect && dificulty === "Easy") setPuntuación(puntuación + 1);

      if (isCorrect && dificulty === "Medium") setPuntuación(puntuación + 2);

      if (isCorrect && dificulty === "Hard") setPuntuación(puntuación + 3);
    }, 1000);

    // añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // cambiar a la siguiente pregunta

    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(90);
      }
    }, 1500);
  }

  useEffect(() => {
    setDificulty(preguntas[preguntaActual].dificultad);

    //Fetchin API
    const fetchAPI = async () => {
      const url = "https://be-a-developer-quiz.onrender.com/question";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      //Create variable to storage title and options
      const arrayQuestions = resultado.questions.map((data: any) => {
        const questionObject = {
          title: data.title,
          options: data.answers,
        };
        return questionObject;
      });
      console.log(arrayQuestions);
      console.log(arrayQuestions[0].title);
      console.log(arrayQuestions[0].options);

      /*
      const arrayAnswers = resultado.questions.answers.map((data) => {
        console.log(data.answerText);
      });
      */
    };
    //fetchAPI();
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
      //añadir dificultad state
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      <main className="app">
        <div className="juego-terminado">
          <span>
            {" "}
            Obtuviste {puntuación} de {maxPuntuacion}{" "}
          </span>
          <button onClick={() => (window.location.href = "/")}>
            {" "}
            Volver a jugar
          </button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setPreguntaActual(0);
            }}
          >
            Ver respuestas
          </button>
        </div>
      </main>
    );

  if (answersShown)
    return (
      <main className="app">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
          </div>
          <div className="titulo-pregunta">
            {preguntas[preguntaActual].titulo}
          </div>
          <div>
            {
              preguntas[preguntaActual].opciones.filter(
                (opcion) => opcion.isCorrect
              )[0].textoRespuesta
            }
          </div>
          <button
            onClick={() => {
              if (preguntaActual === preguntas.length - 1) {
                window.location.href = "/";
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === preguntas.length - 1
              ? "Volver a jugar"
              : "Siguiente"}
          </button>
        </div>
      </main>
    );

  return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
          {preguntas[preguntaActual].titulo}
        </div>
        {/**Añade la dificultad */}
        <div className="dificulty">{preguntas[preguntaActual].dificultad}</div>
        <div>
          {!areDisabled ? (
            <span className="tiempo-restante">
              Tiempo restante: {tiempoRestante}{" "}
            </span>
          ) : (
            <button
              onClick={() => {
                setTiempoRestante(90);
                setAreDisabled(false);
                if (preguntaActual === preguntas.length - 1) {
                  setIsFinished(true);
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
      <div className="lado-derecho">
        {preguntas[preguntaActual].opciones.map((respuesta) => (
          <button
            disabled={areDisabled}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
    </main>
  );
}

export default Quiz;
