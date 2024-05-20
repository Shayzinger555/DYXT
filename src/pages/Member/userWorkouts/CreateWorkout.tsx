import { useNavigate } from "react-router-dom";
import axios from "axios";
import exercises from "./exercises";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "sonner";
import ExercisesList from "./ExercisesList";
import CurrentExercises from "./CurrentExercises";

const CreateWorkout = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const navigate = useNavigate();
  const [initialTitle, setInitialTitle] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSaveWorkout = async () => {
    if (selectedExercises.length < 1) {
      toast.warning("Workout must include atleast one exercise");
      setDisabled(true);
      return;
    } else if (initialTitle.length < 1) {
      toast.warning("Title must be at least 2 keys");
      setDisabled(true);
      return;
    }
    try {
      const workoutData = {
        exercises: selectedExercises,
        title: initialTitle,
      };
      const response = await axios.post("/workouts", workoutData);
      console.log(response);
      navigate("/member/workouts");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (initialTitle.length > 1 && selectedExercises.length > 0) {
      setDisabled(false);
    }
  }, [initialTitle, selectedExercises]);

  const addExerciseToWorkout = (exercise) => {
    if (selectedExercises.length > 0) {
      const UpdatedSelected = [...selectedExercises, exercise];
      console.log(UpdatedSelected);
      setSelectedExercises(UpdatedSelected);
    } else {
      const UpdatedSelected = [exercise];
      console.log(UpdatedSelected);
      setSelectedExercises(UpdatedSelected);
    }
  };

  const removeExercise = (index) => {
    const updatedList = selectedExercises.filter((exercise, i) => i !== index);
    setSelectedExercises(updatedList);
  };

  const handleTitleChange = (e) => {
    setInitialTitle(e.target.value);
  };

  const moveItemUp = (index) => {
    if (index > 0 && index < selectedExercises.length) {
      const newArray = [...selectedExercises];
      const temp = newArray[index];
      newArray[index] = newArray[index - 1];
      newArray[index - 1] = temp;
      setSelectedExercises(newArray);
    }
  };

  const moveItemDown = (index) => {
    if (index >= 0 && index < selectedExercises.length - 1) {
      const newArray = [...selectedExercises];
      const temp = newArray[index];
      newArray[index] = newArray[index + 1];
      newArray[index + 1] = temp;
      setSelectedExercises(newArray);
    }
  };
  return (
    <div>
      <div>
        <div className="flex items-center gap-4 justify-between">
          <div className="flex xl:flex-row flex-col xl:items-center items-start">
            <button
              className="h-[5vh] xl:w-[4vw] flex "
              onClick={() => navigate("/member/workouts")}
            >
              <GoArrowLeft color="white" className="w-full h-full" />
            </button>
            <h1 className="text-white sm:text-[4rem] text-[2rem] xl:mt-0 mt-5">
              Create Workout
            </h1>
          </div>
          <div className="flex flex-col gap-8 mr-[2vw] mt-[3vh]">
            <button
              onClick={handleSaveWorkout}
              className={`rounded-3xl  p-4 text-white bg-orange-400 hover:opacity-[${
                disabled ? "0.5" : "0.8"
              }] opacity-[${disabled ? "0.5" : "1"}]`}
            >
              Save Workout
            </button>
          </div>
        </div>
        <div className="pl-12  w-[100vw]">
          <div>
            <input
              className="bg-gray-600 xl:w-[45vw] w-[80vw] rounded-2xl h-[6vh] p-3 mt-3 text-white"
              onChange={handleTitleChange}
              placeholder="Workout title"
              type="text"
              value={initialTitle}
            />
          </div>

          <div className="w-screen flex xl:flex-row flex-col justify-between mt-5 ">
            <CurrentExercises
              moveItemDown={moveItemDown}
              moveItemUp={moveItemUp}
              exercises={selectedExercises}
              removeExercise={removeExercise}
            />
            <ExercisesList
              exercises={exercises}
              addExerciseToWorkout={addExerciseToWorkout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
