import { jwtDecode } from "jwt-decode";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import tokenCTX from "../../store/tokenCTX";
import loginCTX from "../../store/loginCTX";
import axios from "axios";
import { TextField } from "@mui/material";
import { toast } from "sonner";
import Alert from "@mui/material/Alert";

const LoginForm = () => {
  const { token, setToken } = useContext(tokenCTX);
  const { login, setLogin } = useContext(loginCTX);
  const [inputsValues, setInputsValues] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [disabledLogin, setDisabledLogin] = useState(false);
  const navigate = useNavigate();
  const [isUserBlocked, setIsUserBlocked] = useState(false);

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputsValues((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const handleInputBlur = (key) => {
    if (key === "email") {
      if (!emailRegex.test(inputsValues.email)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    if (key === "password") {
      if (!passwordRegex.test(inputsValues.password)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // Check if email and password match the regex patterns
      if (!emailRegex.test(inputsValues.email)) {
        toast.error("Invalid email");
        return;
      }
      if (!passwordRegex.test(inputsValues.password)) {
        toast.error(
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
        );
        return;
      }

      // Proceed with API call if both email and password match the regex patterns
      const res = await axios.post(
        "http://localhost:5000/users/login",
        inputsValues
      );
      localStorage.setItem("DYXTtoken", res.data);
      setToken(res.data);
      const verifiedToken = jwtDecode(res.data);
      setLogin(verifiedToken);

      navigate("/member");
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Rate limit exceeded, display message to the user
        toast.error("Too many login attempts. Please try again later.");
        setIsUserBlocked(true);
      } else {
        // Unauthorized, likely wrong email or password
        toast.error("Invalid email or password.");
      }
    }
  };

  const loginLabels = ["Email", "Password"];
  return (
    <div className="loginPage">
      <form className="xl:w-[40vw] flex flex-col place-content-around xl:my-12 text-white ml-[6vw] h-[74vh] bg-gradient-to-r from-purple-500 to-purple-800 p-4 rounded-3xl">
        <h1 className="text-3xl">Log In</h1>
        {Object.keys(inputsValues).map((key, i) => (
          <div key={key}>
            <TextField
              className="w-full"
              label={loginLabels[i]}
              id={key}
              value={inputsValues[key as keyof typeof inputsValues]}
              onChange={handleInputsChange}
              onBlur={() => {
                handleInputBlur(key);
              }}
              InputLabelProps={{
                style: { color: "white", border: "3px, 3px, 3px, white" },
              }}
              sx={{
                fieldset: {
                  borderColor: "white",
                },
              }}
            />
            {key === "email" && emailError && (
              <Alert severity="error">Invalid Email</Alert>
            )}
            {key === "password" && passwordError && (
              <Alert severity="error">
                Password must contain at least one lowercase letter, one
                uppercase letter, one digit, one special character, and be at
                least 8 characters long.
              </Alert>
            )}
          </div>
        ))}
        <div className="w-full flex flex-col gap-4 items-center">
          {!isUserBlocked ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="border rounded-3xl bg-white text-purple-500 w-3/4 p-2 text-[1.2rem]"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="border rounded-3xl bg-white bg-opacity-50 text-black w-3/4 p-2 text-[1.2rem]"
            >
              Please Try Again Later
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
