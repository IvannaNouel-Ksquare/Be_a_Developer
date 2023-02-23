import { useState } from "react";
import { Form } from "../../components/Form/";
import ButtonControl from "../../components/Button";
const Categories = () => {
  const [html, setHTML] = useState("HTML");
  const [css, setCSS] = useState("CSS");
  const [sql, setSQL] = useState("SQL");
  const [js, setJS] = useState("JS");

  return (
    <div>
      <ButtonControl
        handleClick={() => {
          console.log("Buton HTML");
        }}
        label={html}
      />
      <ButtonControl
        handleClick={() => {
          console.log("Buton css");
        }}
        label={css}
      />

      <ButtonControl
        handleClick={() => {
          console.log("Buton sql");
        }}
        label={sql}
      />

      <ButtonControl
        handleClick={() => {
          console.log("Buton js");
        }}
        label={js}
      />
    </div>
  );
};

export default Categories;
