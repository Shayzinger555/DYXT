// WorkoutsList.js
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";

const WorkoutsList = ({ myWorkouts }) => {
  const navigate = useNavigate();

  return (
    <div className=" xl:w-[28vw] xl:mr-[1.2vw] flex justify-center w-full ">
      <div className="bg-gray-600  w-[80vw] xl:mt-[0] mt-5  rounded-xl p-3 shadow">
        <h1 className="text-[2rem] text-white h-[20%]">My Workouts</h1>
        {myWorkouts && (
          <div className="flex flex-col justify-between h-[75%] ">
            <ul className="flex flex-col gap-3">
              {myWorkouts.map((workout, i) => (
                <Workout key={i} title={workout.title} id={workout._id} />
              ))}
            </ul>
            <button
              className="w-full bg-orange-400 rounded-3xl mt-5 h-12 hover:opacity-[0.8]"
              onClick={() => navigate(ROUTES.CREATEWORKOUT)}
            >
              Create new workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Workout = ({ title, id }) => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`${id}`);
      }}
      className="cursor-pointer  text-white border-black border-3 rounded-3xl  text-[1.5rem] hover:opacity-[0.5] h-[6vh] p-2 bg-orange-400"
    >
      {title}
    </li>
  );
};

export default WorkoutsList;
