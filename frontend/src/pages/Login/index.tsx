import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthCtx";
import loginImg from "../../assets/login.png";
import registerImg from "../../assets/register.png"

import "./style.css";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const { logIn, signUp } = useAuth();

  const [isRegistered, setIsRegistered] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Delete error message if email and password changed
  useEffect(() => {
    setErrMsg("");
  }, [email, password, isRegistered]);

  //Function to handle submit button
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    isRegistered ? handleRegister() : handleLogIn();
  };

  //Function to handle logig in screen
  const handleLogIn = async () => {
    if (email && password !== "") {
      const loggedIn = await logIn(email, password);
      console.log(loggedIn);
      if (typeof loggedIn === "string") {
        setErrMsg(`${loggedIn}`);
      }
      navigate("/home");
    } else {
      setErrMsg("Error: Both fields are required");
    }
  };

  //Function to handle register screen
  const handleRegister = async () => {
    if (email && password !== "") {
      const signedUp = await signUp(email, password);
      typeof signedUp === "string"
        ? setErrMsg(`${signedUp}`)
        : setSuccessMsg("Registered user! You can now log in");
    } else {
      setErrMsg("Error: Both fields are required");
    }
  };

  return (
    <main className="welcome">
      <div className="login-container">
        <section className="img-container">
          {!isRegistered ? (
            <img src={loginImg} alt="LogIn" />
          ) : (
            <img src={registerImg} alt="SignIn" />
          )}
        </section>
        <section className="form-container">
          <form className="form">
            <h1>{isRegistered ? "Sign In" : "Log In"}</h1>
            <div className="content">
              <p
                className={
                  (!isRegistered || isRegistered) && errMsg
                    ? "error-msg"
                    : "offscreen"
                }
              >
                {errMsg}
              </p>
              <p
                className={
                  isRegistered && successMsg ? "success-msg" : "offscreen"
                }
              >
                {successMsg}
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required={true}
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required={true}
                placeholder="Password"
              />
              <button onClick={handleSubmit} type="submit">
                Ingresar
              </button>
              <p>
                {!isRegistered
                  ? "¿Do you have not an account? "
                  : "¿Do you have an account? "}
                <span onClick={() => setIsRegistered((show) => !show)}>
                  {!isRegistered ? "Sign In here" : "Log In here"}
                </span>
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
