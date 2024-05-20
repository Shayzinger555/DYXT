import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import exercises from "./exercises";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "sonner";
import ConfirmComponent from "../../../components/ConfirmActionComponent";
import ExercisesList from "./ExercisesList";
import CurrentExercises from "./CurrentExercises";

//code
const WorkoutEdit = () => {
  const navigate = useNavigate();
  const [initialExercises, setInitialExercises] = useState([{}]);
  const [initialTitle, setInitialTitle] = useState("title");
  const [disabled, setDisabled] = useState(false);
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const { workout_id } = useParams();

  const getInitialData = async () => {
    try {
      const workout = await axios.get(`workouts/${workout_id}`);
      setInitialExercises(workout.data.exercises);
      setInitialTitle(workout.data.title);
    } catch (error) {}
  };

  useEffect(() => {
    if (workout_id) {
      getInitialData();
    }
  }, []);

  useEffect(() => {
    // validation behaviour on states changes
    if (initialExercises.length < 1) {
      toast.warning("Workout must include atleast one exercise");
      setDisabled(true);
    } else if (initialTitle.length < 1) {
      toast.warning("Title must be at least 2 keys");
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [initialExercises, initialTitle]);

  useEffect(() => {
    console.log(initialTitle);
  }, [initialTitle]);

  const addExerciseToWorkout = (exercise) => {
    if (initialExercises.length > 0) {
      const UpdatedSelected = [...initialExercises, exercise];
      console.log(UpdatedSelected);
      setInitialExercises(UpdatedSelected);
    } else {
      const UpdatedSelected = [exercise];
      console.log(UpdatedSelected);
      setInitialExercises(UpdatedSelected);
    }
  };

  const handleDeleteWorkout = async () => {
    try {
      const response = await axios.delete(`/workouts/${workout_id}`);
      navigate(`/member/workouts`);
    } catch (error) {
      toast.error("Something went wrong deleting the workout");
    }
  };
  const removeExercise = (index) => {
    const updatedList = initialExercises.filter((exercise, i) => i !== index);
    setInitialExercises(updatedList);
  };
  const handleSaveWorkout = async () => {
    if (disabled) {
      toast.error(
        "Please make sure title is over 2 letters and there is at least one exercise"
      );
      return;
    }
    try {
      const workoutData = {
        exercises: initialExercises,
        title: initialTitle,
      };
      const response = await axios.put(`/workouts/${workout_id}`, workoutData);
      console.log(response);
      toast.success("Workout has been editted successfuly");
      navigate("/member/workouts");
    } catch (error) {
      console.log(error);
    }
  };
  const handleTitleChange = (e) => {
    setInitialTitle(e.target.value);
  };
  const moveItemUp = (index) => {
    if (index > 0) {
      const newArray = [...initialExercises];
      newArray.splice(index - 1, 0, newArray.splice(index, 1)[0]);
      setInitialExercises(newArray);
    }
  };
  const moveItemDown = (index) => {
    if (index < initialExercises.length - 1) {
      const newArray = [...initialExercises];
      newArray.splice(index + 1, 0, newArray.splice(index, 1)[0]);
      setInitialExercises(newArray);
    }
  };
  return (
    <div>
      {confirmPopUp && (
        <ConfirmComponent
          text="Are you sure you want to delete this workout?"
          cancelFunction={() => setConfirmPopUp(false)}
          continueFunction={handleDeleteWorkout}
        />
      )}
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
              Edit Workout
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
            <button
              onClick={() => setConfirmPopUp(true)}
              className={`rounded-3xl  p-4 text-orange-400 hover:opacity-80 border border-solid border-2`}
            >
              Delete Workout
            </button>
          </div>
        </div>
        <div className="pl-12  w-[100vw]">
          <div>
            <input
              className="bg-gray-600 rounded-2xl h-[6vh] p-3 mt-3 text-white xl:w-[45vw] w-[80vw]"
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
              exercises={initialExercises}
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

export default WorkoutEdit;
