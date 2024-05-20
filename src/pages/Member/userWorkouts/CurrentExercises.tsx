import ExerciseComponent from "../../../components/ExerciseComponent";

const CurrentExercises = ({
  moveItemDown,
  moveItemUp,
  exercises,
  removeExercise,
}) => {
  return (
    <ul className="bg-orange-400 overflow-y-scroll h-[70vh] pt-6 rounded-3xl flex flex-col items-center gap-[4vh] xl:w-[45vw] w-[80vw] overflow-x-hidden">
      {exercises &&
        exercises.length > 0 &&
        exercises.map((exercise, i) => (
          <ExerciseComponent
            exerciseData={exercise}
            key={i}
            id={exercise._id}
            showRemove={true}
            onRemove={removeExercise}
            index={i}
            moveItemUp={moveItemUp}
            moveItemDown={moveItemDown}
          />
        ))}
    </ul>
  );
};

export default CurrentExercises;
