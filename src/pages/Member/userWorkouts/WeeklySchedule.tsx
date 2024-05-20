import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { toast } from "sonner";

const WeeklySchedule = ({ toggleAddPopUp, setIndex, routine, onRemove }) => {
  const daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [daysFromDB, setDaysFromDB] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [fullWorkouts, setFullWorkouts] = useState({});

  const handleAddWorkout = (index) => {
    toggleAddPopUp();
    setIndex(index);
  };

  const handleRemoveWorkout = (dayIndex, indexOfWorkoutInDay) => {
    onRemove(dayIndex, indexOfWorkoutInDay);
  };

  const getFixedSchedule = () => {
    const daysDataKeys = Object.keys(routine.schedule);
    setDaysFromDB(daysDataKeys);
  };

  useEffect(() => {
    if (routine.schedule) {
      getFixedSchedule();
      setSchedule(routine.schedule);
    }
  }, [routine.schedule]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const allWorkouts = {};

      for (const day of daysFromDB) {
        const errorsLogged = new Set(); // Initialize Set to track logged errors for this day

        try {
          const workouts = schedule[day];
          const fullWorkouts = [];

          for (const workoutId of workouts) {
            try {
              const response = await axios.get(`/workouts/${workoutId}`);
              fullWorkouts.push(response.data);
            } catch (error) {
              if (error.response) {
                const errorMessage = `${error.response.status} ${error.response.statusText}`;
                if (!errorsLogged.has(errorMessage)) {
                  errorsLogged.add(errorMessage); // Add error message to Set to avoid logging
                }
              } else {
                const errorMessage = error.message;
                if (!errorsLogged.has(errorMessage)) {
                  errorsLogged.add(errorMessage);
                }
              }
            }
          }

          allWorkouts[day] = fullWorkouts;
        } catch (error) {
          if (!errorsLogged.has(error.message)) {
            toast.error(error);
            errorsLogged.add(error.message);
          }
        }
      }

      setFullWorkouts(allWorkouts);
      setLoading(false);
    };

    if (daysFromDB.length > 0) {
      fetchWorkouts();
    }
  }, [daysFromDB, schedule]);

  return (
    <div className="flex flex-col items-center text-white">
      {loading ? (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex bg-gray-800 opacity-[0.5] items-center justify-center">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <ul className="weeklySchedule xl:flex-row xl:flex flex flex-col w-[80vw] xl:w-[60vw] xl:h-[60vh] xl:ml-[5vw] ">
          {daysArr.map((day, index) => (
            <li key={index} className="xl:w-full border border-gray-600 ">
              <div className="border-gray-600 border-b">
                <h2 className="text-[1.4rem] xl:text-white text-orange-400">
                  {day}
                </h2>
              </div>
              <ul>
                {fullWorkouts[daysFromDB[index]] &&
                fullWorkouts[daysFromDB[index]].length > 0 ? (
                  fullWorkouts[daysFromDB[index]].map((workout, i) => (
                    <div
                      key={i}
                      className="flex items-center p-3 border-white border mx-auto rounded-md mt-3 bg-orange-400 justify-between"
                    >
                      {workout.title}
                      <IoIosRemoveCircleOutline
                        className="cursor-pointer"
                        onClick={() => handleRemoveWorkout(index, i)}
                      />
                    </div>
                  ))
                ) : (
                  <li>No workouts</li>
                )}
              </ul>
              <button
                onClick={() => handleAddWorkout(index)}
                className="flex items-center p-3 hover:bg-gray-600 border-gray-600 border mx-auto rounded-md mt-3"
              >
                <h3 className="mr-2"> Add Workout</h3>
                <IoIosAddCircleOutline />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeeklySchedule;
