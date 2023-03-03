import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthCtx";


import "./style.css";
import { useDataContext } from "../../context/context";
import { CircularProgress } from "@mui/material";

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
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    handleLogIn();
  };

  const handleLogIn = async () => {
    setIsLoading(true);

    try {
      // Using context function to log in
      const user = await logIn(inputs.email, inputs.password);
      const uid = user.user.uid;

      if (!user || !user.user || !user.user.accessToken) {
        throw new Error("Unable to retrieve user token");
      }

      const loginResponse = await logIn(inputs.email, inputs.password);
      const token = loginResponse.user.accessToken;

      // Setting context value
      context.setUserToken(token);

      // Fetching the user
      const dbUserResponse = await fetch(
        `https://be-a-developer-quiz.onrender.com/user/userId/${uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const dbAdminResponse = await fetch(
        `https://be-a-developer-quiz.onrender.com/user/adminId/${uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!dbUserResponse.ok) {
        throw new Error(`Error fetching user data: ${dbUserResponse.status}`);
      }

      const dbUser = await dbUserResponse.json();
      const dbAdmin = await dbAdminResponse.json();

      const userUid = dbUser.user.uid;
      const adminUid = dbAdmin.user.uid;

      context.setUserId(userUid);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      if (loginErrorCount < 1) {
        setIsLoading(false);

        setErrMsg("Missing  or invalid credentials.");
        setTimeout(() => {
          setErrMsg("");
        }, 3000);
      }
    }
  };
  

  return (
    <main className="welcome-admin">
      <div className="login-container">
      <section className="form-container-admin">

          <form className="form-admin">
            <h1>{"Log In"}</h1>

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
              {isLoading && <CircularProgress />}

              <button onClick={handleSubmit} type="submit">
                Ingresar
              </button>
             
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
