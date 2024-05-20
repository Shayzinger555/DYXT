import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { GiWeightLiftingUp } from "react-icons/gi";
const WorkoutHomeDisplay = ({ data }) => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const getFullWorkout = async () => {
    try {
      const response = await axios.get(`/workouts/${data}`);
      console.log(response.data);

      setWorkout(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFullWorkout();
  }, [data]);

  return (
    <motion.div>
      Workout:
      <div className="bg-orange-400 rounded-xl border min-h-[7vh] p-3 mt-1 flex items-center justify-between">
        {workout && workout.title ? (
          <h2 className="text-white">{workout.title}</h2>
        ) : (
          <div>Loadinggg</div>
        )}
        <button
          onClick={() => {
            navigate(`/member/workouts/${data}`);
          }}
        >
          <GiWeightLiftingUp color="white" />
        </button>
      </div>
    </motion.div>
  );
};

export default WorkoutHomeDisplay;
