import { AnimatePresence, motion } from "framer-motion";
import BasicDateTimePicker from "./DatePickerComponent";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import validateKey from "../validation/validationFunction";
import Alert from "@mui/material/Alert";
import { toast } from "sonner";
import dayjs from "dayjs";

// ?
// Probably the most important and complex component in this project
// this components dynamically responsible for handling all creation and editting of items in the project *Not including users, and workouts
// it gets lots of props for manipulating between deiffernt logic and styles
const PopUpComponent = ({
  onClose,
  onEdit,
  inputs,
  buttonText,
  popUpFunction,
  initialDataForEdit,
  setInitialDataForEdit,
  schema,
  popUpTitle,
  collection,
  withDatePicker,
  pickerText,
  numbersInputs,
}) => {
  const [values, setValues] = useState({});
  const [hasInitialData, setHasInitialData] = useState(false);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState();
  const [disabled, setDisabled] = useState(false);
  const [picker, setPicker] = useState(false);
  const overlayVariants = {
    // Styles for subtle animation
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const isThereInitialData = () => {
    // Converting the existence of initialdata to Boolean
    return !!initialDataForEdit && Object.keys(initialDataForEdit).length > 0;
  };
  useEffect(() => {
    // Activating the initial Check
    setHasInitialData(isThereInitialData());
  }, [initialDataForEdit]);

  useEffect(() => {
    // initialising errors to prevent sending empty values before blurring for Errors
    if (inputs && !initialDataForEdit) {
      const initialErrors = {};
      inputs.titles.forEach((title) => {
        initialErrors[title] = undefined;
      });
      setErrors(initialErrors);
    }
  }, [inputs]);

  useEffect(() => {
    console.log(errors);
  }, [values]);

  useEffect(() => {
    //initialising inputs keys and values.
    if (!hasInitialData) {
      // creation (No init)
      const initialValues = {};
      inputs.titles.forEach((title) => {
        initialValues[title] = "";
      });
      setValues(initialValues);
    } else if (hasInitialData) {
      // Edit (with init)
      setValues(initialDataForEdit);
    }
  }, [inputs, hasInitialData]);

  const handleChange = (title, value) => {
    // following inputs states, setting to number type
    const parsedValue = numbersInputs ? parseFloat(value) : value;
    setValues((prevValues) => ({
      ...prevValues,
      [title]: parsedValue,
    }));
  };

  const clearInitialData = () => {
    // called when closed or submitted
    setHasInitialData(false);
    if (initialDataForEdit) {
      setInitialDataForEdit({});
    }
  };

  const handleInputBlur = (key) => {
    // Sends the blured input to ZOD for Schema validation by Key
    // If error is fixed , we remove it from the errors object
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
    // Track errors to disable and active submit button
    if (Object.keys(errors).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [errors]);

  const handlePopUpSubmit = () => {
    // Popup submit for Creation, if needed ads the date value from the date picker, then clear initial data and closes the popup
    date
      ? popUpFunction(values, collection, date)
      : popUpFunction(values, collection);
    clearInitialData();
    onClose();
  };

  const handleEditSubmit = () => {
    const copyOfUpdatedOBJ = { ...values };
    const item_Id = copyOfUpdatedOBJ._id;
    const newData = { ...copyOfUpdatedOBJ };
    delete newData._id;
    date
      ? onEdit(collection, item_Id, newData, date)
      : onEdit(collection, item_Id, newData);
    clearInitialData();
    onClose();
  };
  const handlePopUPClose = () => {
    clearInitialData();
    onClose();
  };

  const handleBTNclick = () => {
    // transfer to the next
    console.log("niggers");
    if (hasInitialData) {
      console.log("niggers");
      handleEditSubmit();
    } else {
      handlePopUpSubmit();
    }
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="w-[100vw]"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className=" flex items-center justify-center z-[100] fixed top-0 left-0 right-0 min-h-[100vh]"
          style={{ backgroundColor: "rgba(156, 163, 175, 0.7)" }}
        >
          <form className=" overflow-y-auto bg-gray-600 w-[85vw] sm:w-2/4 flex flex-col rounded-[4vh] p-4">
            <div>
              <CloseIcon
                onClick={handlePopUPClose}
                className="cursor-pointer"
              />
            </div>
            {popUpTitle && (
              <h1 className="text-[4.7rem] text-start">{popUpTitle}</h1>
            )}
            {inputs &&
              inputs.titles.map((title, i) => (
                <div>
                  <input
                    type={numbersInputs && "number"}
                    placeholder={inputs.placeholders[i]}
                    title={title}
                    className="w-full rounded mt-[6vh] mb-[2vh] h-[5vh]"
                    key={inputs.titles[i]}
                    value={values ? values[title] : ""}
                    onChange={(e) => handleChange(title, e.target.value)}
                    onBlur={() => handleInputBlur(title)}
                  />
                  {errors[title] && typeof errors[title] === "string" && (
                    <Alert severity="error">{errors[title]}</Alert>
                  )}
                </div>
              ))}
            {withDatePicker && pickerText && (
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPicker(!picker);
                  }}
                  className="min-h-8 mt-6"
                >
                  {pickerText}
                </button>
                {picker && (
                  <BasicDateTimePicker date={date} setDate={setDate} />
                )}
              </div>
            )}

            <button
              className={`mt-[8vh] h-[4vh] bg-blue-400 opacity-${
                disabled ? "50" : "100"
              }`}
              onClick={(e) => {
                e.preventDefault();
                disabled
                  ? toast.error("Please correct the inputs")
                  : handleBTNclick();
              }}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default PopUpComponent;
