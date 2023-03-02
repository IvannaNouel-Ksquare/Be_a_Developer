import React, { useEffect, useState } from "react";

const useFetchQuestions = () => {
  const [questions, setQuestions] = useState("");
  const getQuestions = async () => {
    const req = await fetch("http://localhost:3000/preguntas");
    const res = await req.json();
    console.log(res);
    setQuestions(res);
    console.log(questions);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return [questions];
};

export default useFetchQuestions;
