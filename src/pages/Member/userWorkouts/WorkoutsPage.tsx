import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutsList from "./WorkoutsList";
import WeeklySchedule from "./WeeklySchedule";
import AddWorkoutPopUp from "./AddWorkoutPopUp";
import axios from "axios";
import loginCTX from "../../../store/loginCTX";
import { dayStrings } from "../../../generalStaticData";
import { toast } from "sonner";
const WorkoutsPage = () => {
  const navigate = useNavigate();
  const [addPopUp, setAddPopUp] = useState(false);
  const [index, setIndex] = useState(null); // For Choosing a day to add workout to
  const [myWorkouts, setMyWorkouts] = useState([]);
  const { login } = useContext(loginCTX);
  const [routine, setRoutine] = useState({});

  const getMyWorkoutsAndRoutine = async () => {
    try {
      const reponse = await axios.get("/workouts");
      setMyWorkouts(reponse.data);
      const routineFromDB = await axios.get(`/routines`);
      if (routineFromDB) {
        setRoutine(routineFromDB.data[0]);
      }
    } catch (error) {
      toast.error("something went wrong getting your routine");
    }
  };

  useEffect(() => {
    getMyWorkoutsAndRoutine();
  }, []);
  const toggleAddPopUp = () => {
    setAddPopUp(!addPopUp);
  };

  const handleSubmit = async (selectedWorkout, index) => {
    try {
      if (!routine || !routine._id) {
        console.error("Routine is not properly initialized or missing _id");
        return;
      }
      const updatedRoutine = { ...routine };
      if (!updatedRoutine.schedule) {
        updatedRoutine.schedule = {
          sunday: [],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
        };
      }

      const dayToAddTo = Object.keys(updatedRoutine.schedule)[index];
      updatedRoutine.schedule[dayToAddTo].push(selectedWorkout._id);
      // Update routine in state and send the update to the server

      const response = await axios.put(
        `/routines/${updatedRoutine._id}`,
        updatedRoutine
      );
      setRoutine(response.data);
      setAddPopUp(false);
    } catch (error) {
      toast.error("Error submitting workout");
    }
  };
  const handleRemoveWorkoutFromRoutine = async (
    dayIndex,
    indexOfWorkoutInDay
  ) => {
    try {
      const updatedRoutine = { ...routine };
      const dayString = dayStrings[dayIndex];
      const updatedSchedule = updatedRoutine.schedule[dayString].filter(
        (workout, index) => index !== indexOfWorkoutInDay
      );
      updatedRoutine.schedule[dayString] = updatedSchedule;
      const response = await axios.put(
        `routines/${routine._id}`,
        updatedRoutine
      );
      setRoutine(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-[10vh]">
      {addPopUp && (
        <AddWorkoutPopUp
          onClose={toggleAddPopUp}
          onSubmit={handleSubmit}
          index={index}
          myWorkouts={myWorkouts}
        />
      )}
      {routine ? (
        <div className="min-h-[100vh]">
          <div className="xl:flex-row flex-col flex justify-between">
            <WeeklySchedule
              toggleAddPopUp={toggleAddPopUp}
              index={index}
              setIndex={setIndex}
              routine={routine}
              onRemove={handleRemoveWorkoutFromRoutine}
            />
            <WorkoutsList myWorkouts={myWorkouts} />
          </div>
        </div>
      ) : (
        <div className="h-[100vh] text-3xl text-white">
          Somehow an empty routine wasn't Created when you created the Account,
          please Contact us via the contact Page (:
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage;
