import { useState, useEffect } from "react";
import Error from "../../components/Error";

type Props = {};
export const Form = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correct, setCorrect] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //Validacion de formulario
    if ([question, option1, option2, option3, option4, correct].includes("")) {
      console.log("Hay al menos un campo vacio");
      setError(true);
      return;
    }
    setError(false);

    //Ese codigo se usaba para añadir mas datos al array que contenia los pacientes. Lo deje por si se usa para hacer algo parecido con las preguntas, si no se usa se puede eliminar
    //Objeto de Paciente
    /*
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };
    */
    //console.log(objetoPaciente);
    //setPacientes([...pacientes, objetoPaciente]);

    //Reiniciar el formulario
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrect("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Create questions</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5"
      >
        {error && <Error></Error>}
        <div className="mb-5">
          <label
            htmlFor="question"
            className="block text-gray-700 uppercase font-bold"
          >
            Question
          </label>
          <input
            id="question"
            type="text"
            placeholder="Write the question"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="option-1"
            className="block text-gray-700 uppercase font-bold"
          >
            Answer option 1
          </label>
          <div className="flex">
            <input
              id="option-1"
              type="text"
              placeholder="Write an answer option"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
            <select className="border-2 p-2 mt-2 rounded-md">
              <option value={"false"}>Incorrect</option>
              <option value={"true"}>Correct</option>
            </select>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="option-2"
            className="block text-gray-700 uppercase font-bold"
          >
            Answer option 2
          </label>
          <div className="flex">
            <input
              id="option-2"
              type="text"
              placeholder="Write an answer option"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
            <select className="border-2 p-2 mt-2 rounded-md">
              <option value={"false"}>Incorrect</option>
              <option value={"true"}>Correct</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="option-3"
            className="block text-gray-700 uppercase font-bold"
          >
            Answer option 3
          </label>
          <div className="flex">
            <input
              id="option-3"
              type="text"
              placeholder="Write an answer option"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />
            <select className="border-2 p-2 mt-2 rounded-md">
              <option value={"false"}>Incorrect</option>
              <option value={"true"}>Correct</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="option-4"
            className="block text-gray-700 uppercase font-bold"
          >
            Answer option 4
          </label>
          <div className="flex">
            <input
              id="option-4"
              type="text"
              placeholder="Write an answer option"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
            />
            <select className="border-2 p-2 mt-2 rounded-md">
              <option value={"false"}>Incorrect</option>
              <option value={"true"}>Correct</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="category"
            className="block text-gray-700 uppercase font-bold"
          >
            Set Category
          </label>
          <select
            id="category"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          >
            <option value={"HTML"}>HTML</option>
            <option value={"CSS"}>CSS</option>
            <option value={"SQL"}>SQL</option>
            <option value={"JS"}>JS</option>
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="difficulty"
            className="block text-gray-700 uppercase font-bold"
          >
            Set Difficulty
          </label>
          <select
            id="category"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          >
            <option value={"easy"}>Easy</option>
            <option value={"intermediate"}>Intermediate</option>
            <option value={"hard"}>Hard</option>
            <option value={"JS"}>JS</option>
          </select>
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white
        uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value="Add question"
        />
      </form>
    </div>
  );
};
