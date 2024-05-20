import { useEffect, useState } from "react";
import validateKey from "../../validation/validationFunction";
import Alert from "@mui/material/Alert";
import { toast } from "sonner";
import axios from "axios";
import { Register } from "../../validation/registerValidation";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const popUpTitle = "Sign Up";
  const buttonText = "submit";
  const schema = Register;

  const registerInputs = {
    placeholders: [
      "First Name",
      "Last Name",
      "Username",
      "Title/Role",
      "Phone Number",
      "Email Address",
      "Country",
      "City",
      "Password",
    ],
    titles: [
      "firstName",
      "lastName",
      "userName",
      "title",
      "phone",
      "email",
      "country",
      "city",
      "password",
    ],
  };

  const popUpFunction = async () => {
    try {
      const response = await axios.post("/users", values);
      toast.success("User created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong signing up");
    }
  };

  useEffect(() => {
    // Initializing errors to prevent sending empty values before blurring for errors
    const initialErrors = {};
    registerInputs.titles.forEach((title) => {
      initialErrors[title] = undefined;
    });
    setErrors(initialErrors);

    // Initializing inputs keys and values
    const initialValues = {};
    registerInputs.titles.forEach((title) => {
      initialValues[title] = "";
    });
    setValues(initialValues);
  }, []);

  const handleChange = (title, value) => {
    // Following inputs states, setting to number type if applicable
    const parsedValue = value;
    setValues((prevValues) => ({
      ...prevValues,
      [title]: parsedValue,
    }));
  };

  const handleInputBlur = (key) => {
    // Sends the blurred input to ZOD for schema validation by key
    // If error is fixed, we remove it from the errors object
    const inputToValidate = { [key]: values[key] };
    const result = validateKey(inputToValidate, schema);
    setErrors((prevErrors) => {
      if (result !== values[key]) {
        return {
          ...prevErrors,
          [key]: result,
        };
      } else {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[key];
        return updatedErrors;
      }
    });
  };

  useEffect(() => {
    // Track errors to disable and activate submit button
    if (Object.keys(errors).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [errors]);

  const handlePopUpSubmit = () => {
    popUpFunction();
  };

  const handleBTNclick = () => {
    handlePopUpSubmit();
  };

  return (
    <div className=" flex items-center justify-center  w-[95vw] min-h-[100vh]">
      <form className=" bg-gradient-to-r from-purple-500 to-purple-800  w-[65vw] flex min-h-[80vh] flex-col rounded-[4vh] p-3 ">
        {popUpTitle && (
          <h1 className="sm:text-[4.7rem] text-[1.7rem] text-white text-start">
            {popUpTitle}
          </h1>
        )}
        <div className="grid sm:grid-cols-2 mt-[5vh] gap-4 p-4">
          {registerInputs &&
            registerInputs.titles.map((title, i) => (
              <div
                key={title}
                className={`w-full ${
                  i === registerInputs.titles.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <input
                  placeholder={registerInputs.placeholders[i]}
                  title={title}
                  className="w-full rounded mb-[2vh] h-[5vh]"
                  value={values[title] || ""}
                  onChange={(e) => handleChange(title, e.target.value)}
                  onBlur={() => handleInputBlur(title)}
                />
                {errors[title] && typeof errors[title] === "string" && (
                  <Alert severity="error">{errors[title]}</Alert>
                )}
              </div>
            ))}
        </div>
        <button
          className={`mt-[8vh] h-[4vh] mx-[10%] rounded-3xl bg-white hover:opacity-65 hover:text-purple-500 transition duration-400 ease-in-out  opacity-${
            disabled ? "50" : "100"
          }`}
          onClick={(e) => {
            e.preventDefault();
            disabled
              ? toast.error("Please fill all required the inputs")
              : handleBTNclick();
          }}
        >
          {buttonText}
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className={`mt-[8vh] h-[4vh]  text-blue-200 hover:opacity-65 hover:text-white transition duration-400 ease-in-out  
          `}
        >
          Already have an accout? Log In!
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
