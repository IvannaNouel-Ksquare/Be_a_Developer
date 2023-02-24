import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthCtx";
import loginImg from "../../assets/login.png";
import registerImg from "../../assets/register.png";

import "./style.css";
import { useDataContext } from "../../context/context";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  // Setting initial states and variables
  const context = useDataContext();
  // State that stores the current input values
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // State that stores the current login error count
  const [loginErrorCount, setLoginErrorCount] = useState(0);
  // State that handles the visibility of the password
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
      if (isRegistered) {
        handleRegister();
    } else {
      try {
        // Using context function to log in
        const user = await logIn(inputs.email, inputs.password);

        console.log("inputs", inputs.email);
        console.log("inputs", inputs.password);

        console.log("User:", user);

        if (!user || !user.user || !user.user.accessToken) {
          throw new Error("Unable to retrieve user token");
        }

        const token = await user.user.accessToken;
        const uid = user.user.uid;

        // Setting context value
        context.setUserToken(token);

        // Fetching the user
        const dbUserResponse = await fetch(
          `https://be-a-developer-quiz.onrender.com/user/userId/${uid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!dbUserResponse.ok) {
          throw new Error(`Error fetching user data: ${dbUserResponse.status}`);
        }

        const dbUser = await dbUserResponse.json();
        console.log("dbUser>", dbUser);

        const userUid = dbUser.user.uid;
        console.log("userUid>", userUid);

        // Setting context value
        context.setUserId(userUid);

        // If the user log in successfully, redirect to the Home view
        navigate("/home");
      } catch (error) {
        console.log(error);
        console.error(error);

        if (loginErrorCount < 1) {
          setErrMsg("Incorrect or invalid credentials.");
          setTimeout(() => {
            setErrMsg("");
          }, 3000);
        }
      }
    }
  };
  const handleRegister = async () => {
    if (email && password !== "") {
      const signedUp = await signUp(email, password);
      console.log("signedUp>",signedUp)
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
                id="email"
                name="email"
                onChange={handleInputChange}
                required={true}
                type={"email"}
                value={inputs.email}
                placeholder="Email"
              />
              <input
                id="password"
                name="password"
                onChange={handleInputChange}
                required={true}
                value={inputs.password}
                type="password"
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
