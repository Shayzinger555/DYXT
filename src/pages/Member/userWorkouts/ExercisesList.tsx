import { IoMdAdd } from "react-icons/io";
import ExerciseComponent from "../../../components/ExerciseComponent";
import SearchAppBar from "../../../components/SearchBarComponent";
import { useEffect, useState } from "react";

const ExercisesList = ({ exercises, addExerciseToWorkout }) => {
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  useEffect(() => {}, []);
  return (
    <ul className="mr-24 bg-slate-500 flex-col h-[70vh] rounded-[5vh] xl:w-[20vw] w-[80vw] mt-8 xl:mt-0 flex gap-[2vh] overflow-y-scroll p-[1rem]">
      <div className="h-[7vh] flex items-center w-full pl-[1.2vw] ">
        <SearchAppBar
          allValues={exercises}
          setFilteredValues={setFilteredExercises}
        />
      </div>
      {filteredExercises.map((exercise) => (
        <div className="flex">
          <button
            className="h-full w-[15%]"
            onClick={() => {
              addExerciseToWorkout(exercise);
            }}
          >
            <IoMdAdd className="h-full w-[90%]" />
          </button>

          <ExerciseComponent
            exerciseData={exercise}
            key={exercise.title}
            id={exercise.title}
          />
        </div>
      ))}
    </ul>
  );
};

export default ExercisesList;
